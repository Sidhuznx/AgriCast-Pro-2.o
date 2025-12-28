import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'hi' | 'te' | 'es' | 'fr' | 'de' | 'pt' | 'ru' | 'ja' | 'ko' | 'zh' | 'ar' | 'tr' | 'it' | 'nl' | 'sv' | 'pl' | 'cs' | 'hu' | 'ro' | 'bg' | 'hr' | 'sk' | 'sl' | 'et' | 'lv' | 'lt' | 'fi' | 'da' | 'no' | 'is' | 'ga' | 'mt' | 'cy' | 'eu' | 'ca' | 'gl' | 'ast' | 'oc' | 'co' | 'br' | 'gd' | 'kw' | 'gv' | 'lb' | 'rm' | 'fur' | 'sc' | 'vec' | 'lij' | 'pms' | 'lmo' | 'nap' | 'scn' | 'srd' | 'eml' | 'rgn' | 'lad';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
  availableLanguages: { code: Language; name: string; nativeName: string }[];
  translateText: (text: string, targetLang?: Language) => Promise<string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Base translations for core languages
const baseTranslations = {
  en: {
    welcome: 'Welcome to AgriCast+ Pro',
    voice_assistant: 'Voice Assistant',
    crop_diagnosis: 'Crop Diagnosis',
    fertilizer_guide: 'Fertilizer Guide',
    weather_alerts: 'Weather Alerts',
    market_insights: 'Market Insights',
    nearby_stores: 'Nearby Stores',
    ask_question: 'Ask a farming question...',
    tap_to_speak: 'Tap to speak',
    upload_image: 'Upload crop image for diagnosis',
    current_weather: 'Current Weather',
    today_forecast: 'Today\'s Forecast',
    price_trends: 'Price Trends',
    recommended_crops: 'Recommended Crops',
    find_stores: 'Find Agricultural Stores',
    apply_insurance: 'Apply for Crop Insurance',
    loan_options: 'Loan Options',
    investment_opportunities: 'Investment Opportunities',
    dealer_registration: 'Dealer Registration',
    register_as_dealer: 'Register as Dealer',
    camera_permission_required: 'Camera permission is required',
    microphone_permission_required: 'Microphone permission is required',
    grant_permission: 'Grant Permission',
    upload_photo: 'Upload Photo',
    take_photo: 'Take Photo',
    analyzing_image: 'Analyzing image...',
    image_upload_failed: 'Image upload failed',
    offline_mode: 'You are offline. Some features may be limited.',
    error_occurred: 'An error occurred. Please try again.',
    loading: 'Loading...',
    retry: 'Retry',
    cancel: 'Cancel',
    save: 'Save',
    submit: 'Submit',
    success: 'Success',
    failed: 'Failed',
    no_internet: 'No internet connection',
    current_date_time: 'Current Date & Time',
    last_updated: 'Last updated',
    refresh: 'Refresh',
    location_permission: 'Location permission required for weather updates',
    enable_location: 'Enable Location',
    quick_actions: 'Quick Actions',
    diagnose_crop: 'Diagnose Crop',
    ask_voice_question: 'Ask Voice Question',
    weather_today: 'Weather Today',
    fertilizer_advice: 'Fertilizer Advice',
    market_prices: 'Market Prices',
    find_dealers: 'Find Dealers',
    navigation_error: 'Navigation error occurred',
    feature_unavailable: 'This feature is currently unavailable',
    try_again_later: 'Please try again later',
    farmer_profile: 'Farmer Profile',
    personal_information: 'Personal Information',
    farm_information: 'Farm Information',
    registered_crops: 'Registered Crops',
    financial_status: 'Financial Status',
    language_settings: 'Language & Settings',
    edit_profile: 'Edit Profile',
    save_changes: 'Save Changes',
    profile_updated: 'Profile Updated Successfully',
    select_language: 'Select Language',
    auto_translate: 'Auto Translate',
    translation_powered_by: 'Translation powered by AI',
    offline_translation: 'Offline translation available',
    download_language_pack: 'Download Language Pack',
    language_pack_downloaded: 'Language pack downloaded',
    translation_failed: 'Translation failed, showing original text',
  },
  hi: {
    welcome: 'AgriCast+ Pro में आपका स्वागत है',
    voice_assistant: 'आवाज सहायक',
    crop_diagnosis: 'फसल निदान',
    fertilizer_guide: 'उर्वरक गाइड',
    weather_alerts: 'मौसम अलर्ट',
    market_insights: 'बाजार अंतर्दृष्टि',
    nearby_stores: 'आस-पास की दुकानें',
    ask_question: 'खेती का सवाल पूछें...',
    tap_to_speak: 'बोलने के लिए टैप करें',
    upload_image: 'निदान के लिए फसल की तस्वीर अपलोड करें',
    current_weather: 'वर्तमान मौसम',
    today_forecast: 'आज का पूर्वानुमान',
    price_trends: 'मूल्य रुझान',
    recommended_crops: 'अनुशंसित फसलें',
    find_stores: 'कृषि स्टोर खोजें',
    apply_insurance: 'फसल बीमा के लिए आवेदन करें',
    loan_options: 'ऋण विकल्प',
    investment_opportunities: 'निवेश के अवसर',
    dealer_registration: 'डीलर पंजीकरण',
    register_as_dealer: 'डीलर के रूप में पंजीकरण करें',
    camera_permission_required: 'कैमरा अनुमति आवश्यक है',
    microphone_permission_required: 'माइक्रोफोन अनुमति आवश्यक है',
    grant_permission: 'अनुमति दें',
    upload_photo: 'फोटो अपलोड करें',
    take_photo: 'फोटो लें',
    analyzing_image: 'छवि का विश्लेषण कर रहे हैं...',
    image_upload_failed: 'छवि अपलोड असफल',
    offline_mode: 'आप ऑफलाइन हैं। कुछ सुविधाएं सीमित हो सकती हैं।',
    error_occurred: 'एक त्रुटि हुई। कृपया पुनः प्रयास करें।',
    loading: 'लोड हो रहा है...',
    retry: 'पुनः प्रयास करें',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    submit: 'जमा करें',
    success: 'सफलता',
    failed: 'असफल',
    no_internet: 'इंटरनेट कनेक्शन नहीं',
    current_date_time: 'वर्तमान दिनांक और समय',
    last_updated: 'अंतिम बार अपडेट किया गया',
    refresh: 'रीफ्रेश करें',
    location_permission: 'मौसम अपडेट के लिए स्थान अनुमति आवश्यक',
    enable_location: 'स्थान सक्षम करें',
    quick_actions: 'त्वरित कार्य',
    diagnose_crop: 'फसल निदान',
    ask_voice_question: 'आवाज से प्रश्न पूछें',
    weather_today: 'आज का मौसम',
    fertilizer_advice: 'उर्वरक सलाह',
    market_prices: 'बाजार मूल्य',
    find_dealers: 'डीलर खोजें',
    navigation_error: 'नेवीगेशन त्रुटि हुई',
    feature_unavailable: 'यह सुविधा वर्तमान में उपलब्ध नहीं है',
    try_again_later: 'कृपया बाद में पुनः प्रयास करें',
    farmer_profile: 'किसान प्रोफ़ाइल',
    personal_information: 'व्यक्तिगत जानकारी',
    farm_information: 'खेत की जानकारी',
    registered_crops: 'पंजीकृत फसलें',
    financial_status: 'वित्तीय स्थिति',
    language_settings: 'भाषा और सेटिंग्स',
    edit_profile: 'प्रोफ़ाइल संपादित करें',
    save_changes: 'परिवर्तन सहेजें',
    profile_updated: 'प्रोफ़ाइल सफलतापूर्वक अपडेट की गई',
    select_language: 'भाषा चुनें',
    auto_translate: 'स्वचालित अनुवाद',
    translation_powered_by: 'AI द्वारा संचालित अनुवाद',
    offline_translation: 'ऑफलाइन अनुवाद उपलब्ध',
    download_language_pack: 'भाषा पैक डाउनलोड करें',
    language_pack_downloaded: 'भाषा पैक डाउनलोड हो गया',
    translation_failed: 'अनुवाद असफल, मूल पाठ दिखा रहे हैं',
  },
  te: {
    welcome: 'AgriCast+ Pro కి స్వాగతం',
    voice_assistant: 'వాయిస్ అసిస్టెంట్',
    crop_diagnosis: 'పంట నిర్ధారణ',
    fertilizer_guide: 'ఎరువుల గైడ్',
    weather_alerts: 'వాతావరణ హెచ్చరికలు',
    market_insights: 'మార్కెట్ అంతర్దృష్టులు',
    nearby_stores: 'సమీప దుకాణాలు',
    ask_question: 'వ్యవసాయ ప్రశ్న అడగండి...',
    tap_to_speak: 'మాట్లాడటానికి టాప్ చేయండి',
    upload_image: 'నిర్ధారణ కోసం పంట చిత్రాన్ని అప్‌లోడ్ చేయండి',
    current_weather: 'ప్రస్తుత వాతావరణం',
    today_forecast: 'నేటి అంచనా',
    price_trends: 'ధర ధోరణులు',
    recommended_crops: 'సిఫార్సు చేసిన పంటలు',
    find_stores: 'వ్యవసాయ దుకాణాలను కనుగొనండి',
    apply_insurance: 'పంట బీమా కోసం దరఖాస్తు చేయండి',
    loan_options: 'రుణ ఎంపికలు',
    investment_opportunities: 'పెట్టుబడి అవకాశాలు',
    dealer_registration: 'డీలర్ రిజిస్ట్రేషన్',
    register_as_dealer: 'డీలర్‌గా నమోదు చేసుకోండి',
    camera_permission_required: 'కెమెరా అనుమతి అవసరం',
    microphone_permission_required: 'మైక్రోఫోన్ అనుమతి అవసరం',
    grant_permission: 'అనుమతి ఇవ్వండి',
    upload_photo: 'ఫోటో అప్‌లోడ్ చేయండి',
    take_photo: 'ఫోటో తీయండి',
    analyzing_image: 'చిత్రాన్ని విశ్లేషిస్తోంది...',
    image_upload_failed: 'చిత్రం అప్‌లోడ్ విఫలమైంది',
    offline_mode: 'మీరు ఆఫ్‌లైన్‌లో ఉన్నారు। కొన్ని ఫీచర్లు పరిమితం కావచ్చు.',
    error_occurred: 'లోపం సంభవించింది। దయచేసి మళ్లీ ప్రయత్నించండి.',
    loading: 'లోడ్ అవుతోంది...',
    retry: 'మళ్లీ ప్రయత్నించండి',
    cancel: 'రద్దు చేయండి',
    save: 'సేవ్ చేయండి',
    submit: 'సమర్పించండి',
    success: 'విజయం',
    failed: 'విఫలమైంది',
    no_internet: 'ఇంటర్నెట్ కనెక్షన్ లేదు',
    current_date_time: 'ప్రస్తుత తేదీ మరియు సమయం',
    last_updated: 'చివరిసారి అప్‌డేట్ చేయబడింది',
    refresh: 'రిఫ్రెష్ చేయండి',
    location_permission: 'వాతావరణ అప్‌డేట్‌ల కోసం లొకేషన్ అనుమతి అవసరం',
    enable_location: 'లొకేషన్ ప్రారంభించండి',
    quick_actions: 'త్వరిత చర్యలు',
    diagnose_crop: 'పంట నిర్ధారణ',
    ask_voice_question: 'వాయిస్‌తో ప్రశ్న అడగండి',
    weather_today: 'నేటి వాతావరణం',
    fertilizer_advice: 'ఎరువుల సలహా',
    market_prices: 'మార్కెట్ ధరలు',
    find_dealers: 'డీలర్లను కనుగొనండి',
    navigation_error: 'నావిగేషన్ లోపం సంభవించింది',
    feature_unavailable: 'ఈ ఫీచర్ ప్రస్తుతం అందుబాటులో లేదు',
    try_again_later: 'దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి',
    farmer_profile: 'రైతు ప్రొఫైల్',
    personal_information: 'వ్యక్తిగత సమాచారం',
    farm_information: 'వ్యవసాయ సమాచారం',
    registered_crops: 'నమోదిత పంటలు',
    financial_status: 'ఆర్థిక స్థితి',
    language_settings: 'భాష మరియు సెట్టింగ్‌లు',
    edit_profile: 'ప్రొఫైల్ సవరించండి',
    save_changes: 'మార్పులను సేవ్ చేయండి',
    profile_updated: 'ప్రొఫైల్ విజయవంతంగా అప్‌డేట్ చేయబడింది',
    select_language: 'భాషను ఎంచుకోండి',
    auto_translate: 'ఆటో అనువాదం',
    translation_powered_by: 'AI ద్వారా శక్తివంతమైన అనువాదం',
    offline_translation: 'ఆఫ్‌లైన్ అనువాదం అందుబాటులో ఉంది',
    download_language_pack: 'భాష ప్యాక్ డౌన్‌లోడ్ చేయండి',
    language_pack_downloaded: 'భాష ప్యాక్ డౌన్‌లోడ్ చేయబడింది',
    translation_failed: 'అనువాదం విఫలమైంది, అసలు వచనాన్ని చూపిస్తోంది',
  },
};

// Global language list with native names
const globalLanguages = [
  { code: 'en' as Language, name: 'English', nativeName: 'English' },
  { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'te' as Language, name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'es' as Language, name: 'Spanish', nativeName: 'Español' },
  { code: 'fr' as Language, name: 'French', nativeName: 'Français' },
  { code: 'de' as Language, name: 'German', nativeName: 'Deutsch' },
  { code: 'pt' as Language, name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru' as Language, name: 'Russian', nativeName: 'Русский' },
  { code: 'ja' as Language, name: 'Japanese', nativeName: '日本語' },
  { code: 'ko' as Language, name: 'Korean', nativeName: '한국어' },
  { code: 'zh' as Language, name: 'Chinese', nativeName: '中文' },
  { code: 'ar' as Language, name: 'Arabic', nativeName: 'العربية' },
  { code: 'tr' as Language, name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'it' as Language, name: 'Italian', nativeName: 'Italiano' },
  { code: 'nl' as Language, name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'sv' as Language, name: 'Swedish', nativeName: 'Svenska' },
  { code: 'pl' as Language, name: 'Polish', nativeName: 'Polski' },
  { code: 'cs' as Language, name: 'Czech', nativeName: 'Čeština' },
  { code: 'hu' as Language, name: 'Hungarian', nativeName: 'Magyar' },
  { code: 'ro' as Language, name: 'Romanian', nativeName: 'Română' },
  { code: 'bg' as Language, name: 'Bulgarian', nativeName: 'Български' },
  { code: 'hr' as Language, name: 'Croatian', nativeName: 'Hrvatski' },
  { code: 'sk' as Language, name: 'Slovak', nativeName: 'Slovenčina' },
  { code: 'sl' as Language, name: 'Slovenian', nativeName: 'Slovenščina' },
  { code: 'et' as Language, name: 'Estonian', nativeName: 'Eesti' },
  { code: 'lv' as Language, name: 'Latvian', nativeName: 'Latviešu' },
  { code: 'lt' as Language, name: 'Lithuanian', nativeName: 'Lietuvių' },
  { code: 'fi' as Language, name: 'Finnish', nativeName: 'Suomi' },
  { code: 'da' as Language, name: 'Danish', nativeName: 'Dansk' },
  { code: 'no' as Language, name: 'Norwegian', nativeName: 'Norsk' },
];

// Translation cache
const translationCache = new Map<string, string>();

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicTranslations, setDynamicTranslations] = useState<Record<string, Record<string, string>>>({});

  // Detect device language on first load
  useEffect(() => {
    const detectLanguage = () => {
      const deviceLanguage = navigator.language.split('-')[0] as Language;
      const supportedLanguage = globalLanguages.find(lang => lang.code === deviceLanguage);
      if (supportedLanguage) {
        setLanguage(deviceLanguage);
      }
    };

    detectLanguage();
  }, []);

  const translateText = async (text: string, targetLang: Language = language): Promise<string> => {
    // Check cache first
    const cacheKey = `${text}_${targetLang}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!;
    }

    // If target language is English or we have base translation, return it
    if (targetLang === 'en' || baseTranslations[targetLang as keyof typeof baseTranslations]) {
      return text;
    }

    try {
      // Mock translation API call - in production, use Google Translate API or Microsoft Translator
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          targetLanguage: targetLang,
          sourceLanguage: 'en',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const translatedText = data.translatedText || text;
        
        // Cache the translation
        translationCache.set(cacheKey, translatedText);
        
        return translatedText;
      }
    } catch (error) {
      console.warn('Translation API failed:', error);
    }

    // Fallback: return original text
    return text;
  };

  const changeLanguage = async (lang: Language) => {
    setIsLoading(true);
    try {
      // Simulate language change loading
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // If it's not a base language, load dynamic translations
      if (!baseTranslations[lang as keyof typeof baseTranslations]) {
        // In production, you would load translations from a translation service
        // For now, we'll use the base English translations
        const englishTranslations = baseTranslations.en;
        const translatedKeys: Record<string, string> = {};
        
        // Translate key phrases (in production, batch translate these)
        for (const [key, value] of Object.entries(englishTranslations)) {
          try {
            translatedKeys[key] = await translateText(value, lang);
          } catch (error) {
            translatedKeys[key] = value; // Fallback to English
          }
        }
        
        setDynamicTranslations(prev => ({
          ...prev,
          [lang]: translatedKeys,
        }));
      }
      
      setLanguage(lang);
    } catch (error) {
      console.error('Error changing language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const t = (key: string): string => {
    // First check base translations
    const baseTranslation = baseTranslations[language as keyof typeof baseTranslations];
    if (baseTranslation && baseTranslation[key as keyof typeof baseTranslation]) {
      return baseTranslation[key as keyof typeof baseTranslation];
    }
    
    // Then check dynamic translations
    if (dynamicTranslations[language] && dynamicTranslations[language][key]) {
      return dynamicTranslations[language][key];
    }
    
    // Fallback to English
    const englishTranslation = baseTranslations.en[key as keyof typeof baseTranslations.en];
    if (englishTranslation) {
      return englishTranslation;
    }
    
    // Final fallback: return the key itself
    return key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: changeLanguage, 
      t, 
      isLoading,
      availableLanguages: globalLanguages,
      translateText
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}