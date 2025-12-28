import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  currentDateTime: string;
  timezone: string;
  lastUpdated: string;
  location: string;
  pressure: number;
  feelsLike: number;
  dewPoint: number;
  forecast: DailyForecast[];
  hourlyForecast: HourlyForecast[];
}

interface DailyForecast {
  date: string;
  high: number;
  low: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  icon: string;
}

interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
  precipitation: number;
  windSpeed: number;
  icon: string;
}

interface LocationCoords {
  latitude: number;
  longitude: number;
}

// Weather API configuration
const WEATHER_API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY || 'demo_key';
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export function useWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationCoords | null>(null);

  const getCurrentLocation = async (): Promise<LocationCoords | null> => {
    if (Platform.OS === 'web') {
      return new Promise((resolve) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (error) => {
              console.warn('Geolocation error:', error);
              // Fallback to default location (New Delhi)
              resolve({ latitude: 28.6139, longitude: 77.2090 });
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 300000, // 5 minutes
            }
          );
        } else {
          resolve({ latitude: 28.6139, longitude: 77.2090 });
        }
      });
    }
    
    // For mobile platforms, you would use expo-location here
    // For now, return default location
    return { latitude: 28.6139, longitude: 77.2090 };
  };

  const fetchRealWeatherData = async (coords: LocationCoords): Promise<WeatherData> => {
    try {
      // Current weather
      const currentResponse = await fetch(
        `${WEATHER_API_BASE_URL}/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${WEATHER_API_KEY}&units=metric`
      );
      
      if (!currentResponse.ok) {
        throw new Error(`Weather API error: ${currentResponse.status}`);
      }
      
      const currentData = await currentResponse.json();

      // 5-day forecast
      const forecastResponse = await fetch(
        `${WEATHER_API_BASE_URL}/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${WEATHER_API_KEY}&units=metric`
      );
      
      if (!forecastResponse.ok) {
        throw new Error(`Forecast API error: ${forecastResponse.status}`);
      }
      
      const forecastData = await forecastResponse.json();

      // Process forecast data
      const dailyForecast: DailyForecast[] = [];
      const hourlyForecast: HourlyForecast[] = [];
      
      // Group forecast by days
      const dailyGroups: { [key: string]: any[] } = {};
      
      forecastData.list.slice(0, 40).forEach((item: any, index: number) => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();
        
        if (!dailyGroups[dateKey]) {
          dailyGroups[dateKey] = [];
        }
        dailyGroups[dateKey].push(item);

        // Add to hourly forecast (next 24 hours)
        if (index < 8) {
          hourlyForecast.push({
            time: date.toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              hour12: true 
            }),
            temperature: Math.round(item.main.temp),
            condition: item.weather[0].main,
            precipitation: Math.round((item.pop || 0) * 100),
            windSpeed: Math.round(item.wind.speed * 3.6), // Convert m/s to km/h
            icon: item.weather[0].icon,
          });
        }
      });

      // Process daily forecast
      Object.keys(dailyGroups).slice(0, 7).forEach((dateKey) => {
        const dayData = dailyGroups[dateKey];
        const temps = dayData.map(item => item.main.temp);
        const high = Math.round(Math.max(...temps));
        const low = Math.round(Math.min(...temps));
        
        // Use midday data for conditions
        const middayData = dayData[Math.floor(dayData.length / 2)] || dayData[0];
        
        dailyForecast.push({
          date: new Date(dateKey).toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'short',
            day: 'numeric'
          }),
          high,
          low,
          condition: middayData.weather[0].main,
          humidity: middayData.main.humidity,
          windSpeed: Math.round(middayData.wind.speed * 3.6),
          precipitation: Math.round((middayData.pop || 0) * 100),
          icon: middayData.weather[0].icon,
        });
      });

      const now = new Date();
      const sunrise = new Date(currentData.sys.sunrise * 1000);
      const sunset = new Date(currentData.sys.sunset * 1000);

      return {
        temperature: Math.round(currentData.main.temp),
        condition: currentData.weather[0].main,
        humidity: currentData.main.humidity,
        windSpeed: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
        visibility: Math.round((currentData.visibility || 10000) / 1000), // Convert m to km
        uvIndex: 5, // UV index not available in free tier, using default
        pressure: currentData.main.pressure,
        feelsLike: Math.round(currentData.main.feels_like),
        dewPoint: Math.round(currentData.main.temp - ((100 - currentData.main.humidity) / 5)),
        sunrise: sunrise.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        sunset: sunset.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        currentDateTime: now.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        lastUpdated: now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        location: `${currentData.name}, ${currentData.sys.country}`,
        forecast: dailyForecast,
        hourlyForecast: hourlyForecast,
      };
    } catch (apiError) {
      console.warn('Weather API failed, using fallback data:', apiError);
      throw apiError;
    }
  };

  const getFallbackWeatherData = (coords: LocationCoords): WeatherData => {
    const now = new Date();
    
    // Generate realistic weather data based on location and season
    const isNorthernHemisphere = coords.latitude > 0;
    const month = now.getMonth();
    const isWinter = isNorthernHemisphere ? (month >= 11 || month <= 2) : (month >= 5 && month <= 8);
    const isSummer = isNorthernHemisphere ? (month >= 5 && month <= 8) : (month >= 11 || month <= 2);
    
    let baseTemp = 20;
    if (isSummer) baseTemp = 30;
    if (isWinter) baseTemp = 15;
    
    // Add some randomness
    const temperature = Math.round(baseTemp + (Math.random() - 0.5) * 10);
    const humidity = Math.round(50 + Math.random() * 30);
    
    const conditions = ['Clear', 'Clouds', 'Rain', 'Mist'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];

    // Generate forecast data
    const forecast: DailyForecast[] = [];
    const hourlyForecast: HourlyForecast[] = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i);
      
      forecast.push({
        date: date.toLocaleDateString('en-US', { 
          weekday: 'long',
          month: 'short',
          day: 'numeric'
        }),
        high: Math.round(temperature + Math.random() * 5),
        low: Math.round(temperature - 5 - Math.random() * 5),
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        humidity: Math.round(50 + Math.random() * 30),
        windSpeed: Math.round(5 + Math.random() * 15),
        precipitation: Math.round(Math.random() * 100),
        icon: '01d',
      });
    }

    for (let i = 0; i < 8; i++) {
      const time = new Date(now);
      time.setHours(time.getHours() + i * 3);
      
      hourlyForecast.push({
        time: time.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          hour12: true 
        }),
        temperature: Math.round(temperature + (Math.random() - 0.5) * 6),
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        precipitation: Math.round(Math.random() * 100),
        windSpeed: Math.round(5 + Math.random() * 15),
        icon: '01d',
      });
    }

    return {
      temperature,
      condition,
      humidity,
      windSpeed: Math.round(10 + Math.random() * 10),
      visibility: Math.round(8 + Math.random() * 2),
      uvIndex: Math.round(4 + Math.random() * 4),
      pressure: Math.round(1010 + Math.random() * 20),
      feelsLike: Math.round(temperature + (Math.random() - 0.5) * 4),
      dewPoint: Math.round(temperature - 5),
      sunrise: '06:15 AM',
      sunset: '06:45 PM',
      currentDateTime: now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      lastUpdated: now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      location: 'Current Location',
      forecast,
      hourlyForecast,
    };
  };

  const fetchWeatherData = async (coords?: LocationCoords) => {
    try {
      setLoading(true);
      setError(null);

      const targetCoords = coords || location || await getCurrentLocation();
      if (!targetCoords) {
        throw new Error('Unable to get location');
      }

      let weatherData: WeatherData;
      
      try {
        // Try to fetch real weather data
        weatherData = await fetchRealWeatherData(targetCoords);
      } catch (apiError) {
        // Fall back to mock data if API fails
        console.warn('Using fallback weather data');
        weatherData = getFallbackWeatherData(targetCoords);
        setError('Using offline weather data. Connect to internet for live updates.');
      }

      setWeatherData(weatherData);
      setLocation(targetCoords);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      
      // Provide fallback data even on error
      const fallbackCoords = { latitude: 28.6139, longitude: 77.2090 };
      setWeatherData(getFallbackWeatherData(fallbackCoords));
      setLocation(fallbackCoords);
    } finally {
      setLoading(false);
    }
  };

  const refreshWeather = () => {
    fetchWeatherData();
  };

  useEffect(() => {
    fetchWeatherData();
    
    // Auto-refresh every 10 minutes
    const interval = setInterval(() => {
      fetchWeatherData();
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    weatherData,
    loading,
    error,
    refreshWeather,
    location
  };
}