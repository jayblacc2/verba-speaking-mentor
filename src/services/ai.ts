import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateSpeech(text: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    
    const inlineData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;
    return { data: inlineData?.data, mimeType: inlineData?.mimeType };
  } catch (error) {
    console.error("Speech generation failed", error);
    return null;
  }
}

export async function generateAIResponse(history: { role: 'user' | 'model', parts: { text: string }[] }[], mode: 'balanced' | 'grammar' | 'pronunciation' = 'balanced', context: string = '') {
  const model = "gemini-3-flash-preview";
  
  let instruction = "You are Verba AI, a friendly and supportive language mentor. Your goal is to help users practice their speaking and listening skills. Keep your responses concise (2-3 sentences), encouraging, and ask relevant follow-up questions to keep the conversation flowing. Occasionally provide a gentle 'Grammar Tip' if you notice a clear mistake.";
  
  if (mode === 'grammar') {
    instruction = "You are Verba AI, a friendly and supportive language mentor focusing strictly on GRAMMAR. Your goal is to help users perfect their sentence structure. Keep your responses concise, encouraging, and ask relevant follow-up questions. You MUST provide detailed grammar corrections for every mistake you find in their last message.";
  } else if (mode === 'pronunciation') {
    instruction = "You are Verba AI, a friendly and supportive language mentor focusing strictly on PRONUNCIATION and SPOKEN COMMUNICATION. Your goal is to keep the conversation flowing naturally without interrupting too much for grammar rules. Keep your responses conversational, concise, and engaging.";
  }

  if (context) {
    instruction += `\nRoleplay Scenario Context: ${context}. Act out this scenario naturally.`;
  }


  const response = await ai.models.generateContent({
    model,
    contents: history,
    config: {
      systemInstruction: instruction,
    }
  });

  return response.text;
}

export async function getCorrections(transcript: string) {
  const model = "gemini-3-flash-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: `Analyze the following transcript of a language learner and provide 2-3 gentle corrections in JSON format.
    
    Transcript: "${transcript}"
    
    Response format:
    [
      { "original": "...", "corrected": "...", "explanation": "...", "type": "Grammar" | "Vocabulary" }
    ]`,
    config: {
      responseMimeType: "application/json",
    }
  });

  try {
    return JSON.parse(response.text || '[]');
  } catch (e) {
    return [];
  }
}

export async function analyzeSpeech(base64Audio: string, mimeType: string, mode: 'balanced' | 'grammar' | 'pronunciation' = 'balanced') {
  const model = "gemini-3-flash-preview";
  
  let instructions = `You are an expert language pronunciation and speech coach. Listen to this audio recording of a language learner.
  Provide a response in strict JSON format. `;

  if (mode === 'grammar') {
    instructions += `Be hyper-critical of GRAMMAR. Return this structure:
      {
        "transcript": "Exact transcription of what they said",
        "grammarTip": {
          "wrong": "Any grammatically incorrect phrase they used (or omit property if none)",
          "right": "The corrected phrase (or omit)",
          "explanation": "Detailed explanation of why it was changed and the grammar rule (or omit)"
        }
      }`;
  } else if (mode === 'pronunciation') {
     instructions += `Be hyper-critical of PRONUNCIATION, TONE, and ENUNCIATION. Ignore grammar mistakes unless they change the meaning. Return this structure:
      {
        "transcript": "Exact transcription of what they said",
        "feedback": {
          "pitch": "Detailed feedback on their pitch and intonation",
          "tone": "Detailed feedback on their tone (confident, hesitant, formal?)",
          "enunciation": "Detailed feedback on their enunciation and clarity of specific phonemes",
          "fluencyScore": 85
        }
      }`;
  } else {
     instructions += `Provide balanced feedback on both grammar and pronunciation. Return this structure:
      {
        "transcript": "Exact transcription of what they said",
        "feedback": {
          "pitch": "Brief feedback on their pitch",
          "tone": "Brief feedback on their tone",
          "enunciation": "Brief feedback on their enunciation",
          "fluencyScore": 85
        },
        "grammarTip": {
          "wrong": "Any grammatically incorrect phrase they used (or omit if none)",
          "right": "The corrected phrase (or omit)",
          "explanation": "Why it was changed (or omit)"
        }
      }`;
  }
  
  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        inlineData: {
          data: base64Audio,
          mimeType: mimeType
        }
      },
      instructions
    ],
    config: {
      responseMimeType: "application/json",
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Failed to parse JSON response", e);
    return null;
  }
}
