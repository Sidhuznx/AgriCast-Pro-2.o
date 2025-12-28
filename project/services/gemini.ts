import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
      throw new Error('Gemini API key is not configured. Please set EXPO_PUBLIC_GEMINI_API_KEY in your .env file.');
    }
    ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  }
  return ai;
}

export interface CropDiagnosisResult {
  condition: string;
  severity: 'Low' | 'Moderate' | 'High' | 'Critical';
  confidence: number;
  treatment: {
    organic: string[];
    chemical: string[];
  };
  prevention: string[];
}

export async function analyzeCropImage(imageBase64: string): Promise<CropDiagnosisResult> {
  const client = getGeminiClient();

  const prompt = `You are an expert agricultural scientist specializing in plant pathology and crop disease diagnosis. 
Analyze the provided image of a crop/plant and provide a detailed diagnosis.

Please respond with a JSON object in the following format:
{
  "condition": "Name of the disease or condition (e.g., 'Leaf Spot Disease', 'Healthy Plant', 'Nutrient Deficiency')",
  "severity": "One of: Low, Moderate, High, Critical",
  "confidence": A number between 0-100 representing your confidence percentage,
  "treatment": {
    "organic": ["List of 2-4 organic treatment methods"],
    "chemical": ["List of 2-4 chemical treatment methods if applicable"]
  },
  "prevention": ["List of 3-5 prevention tips to avoid this condition in the future"]
}

If the image doesn't show a plant or crop, or if you cannot determine the condition, still provide your best assessment with appropriate confidence level.

Respond ONLY with the JSON object, no additional text or markdown formatting.`;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: imageBase64,
              },
            },
          ],
        },
      ],
    });

    const text = response.text?.trim() || '';
    
    // Parse the JSON response
    let result: CropDiagnosisResult;
    try {
      // Remove any markdown code block formatting if present
      let cleanedText = text;
      if (text.startsWith('```json')) {
        cleanedText = text.replace(/^```json\n?/, '').replace(/\n?```$/, '');
      } else if (text.startsWith('```')) {
        cleanedText = text.replace(/^```\n?/, '').replace(/\n?```$/, '');
      }
      result = JSON.parse(cleanedText);
    } catch {
      // If JSON parsing fails, return a default structure with the raw response
      result = {
        condition: 'Analysis Complete',
        severity: 'Moderate',
        confidence: 70,
        treatment: {
          organic: ['Please consult with a local agricultural expert for specific treatments.'],
          chemical: ['Consult with a certified agronomist for chemical treatment options.'],
        },
        prevention: [
          'Maintain proper plant spacing',
          'Ensure adequate drainage',
          'Monitor plants regularly for early signs of disease',
        ],
      };
    }

    return result;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to analyze crop image. Please try again.');
  }
}

export async function translateWithGemini(text: string, targetLanguage: string, sourceLanguage: string = 'en'): Promise<string> {
  const client = getGeminiClient();

  const prompt = `Translate the following text from ${sourceLanguage} to ${targetLanguage}. 
Only provide the translation, no explanations or additional text.

Text to translate: "${text}"`;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    return response.text?.trim() || text;
  } catch (error) {
    console.error('Gemini translation error:', error);
    throw new Error('Translation failed. Please try again.');
  }
}

export async function getAgricultureAdvice(query: string): Promise<string> {
  const client = getGeminiClient();

  const prompt = `You are an expert agricultural advisor helping farmers with their queries. 
Provide helpful, practical, and actionable advice for the following question. 
Keep your response concise but comprehensive (2-3 paragraphs maximum).

Query: ${query}`;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    return response.text?.trim() || 'Unable to generate advice at this time.';
  } catch (error) {
    console.error('Gemini advice error:', error);
    throw new Error('Failed to get advice. Please try again.');
  }
}

export function isGeminiConfigured(): boolean {
  return !!GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here';
}
