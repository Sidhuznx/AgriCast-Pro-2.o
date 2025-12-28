declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_WEATHER_API_KEY: string;
      EXPO_PUBLIC_GOOGLE_TRANSLATE_API_KEY: string;
      EXPO_PUBLIC_MICROSOFT_TRANSLATOR_KEY: string;
      EXPO_PUBLIC_GEMINI_API_KEY: string;
      EXPO_PUBLIC_API_URL: string;
    }
  }
}

// Ensure this file is treated as a module
export {};