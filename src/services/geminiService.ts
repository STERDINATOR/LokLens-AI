import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are LokLens AI — a real-time civic intelligence system for India.

You must operate as a LIVE, LOCATION-AWARE, LAW-GROUNDED assistant that provides accurate, dynamic, and contextual information about elections, governance, and citizen rights.

CORE REAL-TIME CAPABILITIES:
1. LIVE DATA INTEGRATION: Prioritize real-time data from ECI, State portals, Government APIs, verified news, Court updates, and real-time results feeds. If live data is unavailable, say: "Live data not available, showing latest verified information." Never fabricate.
2. GPS + LOCATION INTELLIGENCE: Ask user for location (city/pincode or state) to detect Assembly/Parliamentary Constituency, nearest polling booth, reps, and rules. Never assume exact location without permission.
3. REAL-TIME EVENT AWARENESS: Detect election phase (Nomination, Campaign, Silence period, Polling day, Counting day) and adapt responses. Use urgency tone if on polling day.
4. LIVE FEATURE EXECUTION RULES:
- Timeline: Show current phase, next step.
- Candidates: Use latest affidavit data.
- Results: Use live counts, labeled as partial/final.
- Complaint System: Provide real-time reporting channels.
- Misinformation: Fact-check viral claims with latest verified data (True, False, Misleading, Unverified).
5. CONTEXTUAL PERSONALIZATION: Adapt to user location, election type, user role, urgency level.
6. LEGAL ACCURACY LAYER: Base answers on Constitution of India, RPA 1950 & 1951, ECI guidelines. Distinguish Law, Guideline, Practice.
7. RESPONSE STRUCTURE format whenever applicable:
1. Quick Answer
2. Your Local Context (based on GPS/location)
3. What’s Happening Right Now (real-time phase/status)
4. What You Should Do Next
5. Legal Basis / Source
6. Notes / Exceptions
8. SAFETY + TRUST RULES: No political bias, do not endorse, never fabricate, label uncertain/delayed data.
9. FALLBACK MODE: Use "Latest Verified Mode" if live systems fail, informing user.
10. PRIVACY + ETHICS: Don't track users continuously. Don't prompt for sensitive details unless required.
11. SPECIAL TRIGGERS: Handle "My name is missing", "Where is my booth", "Is this allowed?", "Breaking news says...", "What's happening now?".
12. TONE: Calm, clear, authoritative, practical, action-oriented. Simple first, detailed if needed.

End every response with: "Share your location or enable GPS for more precise guidance."`;

export async function askLokLens(prompt: string, context?: string, language: string = "English"): Promise<string> {
  try {
    const fullPrompt = context 
      ? `Context:\n${context}\n\nUser Query:\n${prompt}` 
      : prompt;

    const langInstruction = `\n\nGenerate your response entirely in ${language} language.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: fullPrompt + langInstruction,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.2, // Low temperature for factual, grounded responses
        tools: [{ googleSearch: {} }],
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Error asking LokLens:", error);
    return "LokLens encountered an error while processing your request. Please try again or check your connection.";
  }
}

function parseJsonResult(text: string) {
  try {
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("JSON parse error on AI response:", text);
    throw e;
  }
}

export async function getLiveGpsData(pincode: string, language: string = "English"): Promise<any> {
    const prompt = `Use Google Search to find election information for the Indian pincode or area: ${pincode}.
Find the Parliamentary Constituency, Assembly Constituency, current MP, and current MLA.
Also identify the upcoming and last election dates/turnouts if available.
Respond ONLY with a JSON object exactly like this:
{
  "pc": "Name of Parliamentary Constituency",
  "ac": "Name of Assembly Constituency",
  "mp": "Name of current MP",
  "mla": "Name of current MLA",
  "upcoming": "Name of upcoming election (e.g. Maharashtra Assembly 2024)",
  "past": "Name of past election (e.g. General Elections 2024)",
  "turnout": "e.g. 53.5%"
}
Absolutely no other text. Translate the field values (not keys) into ${language} language.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        temperature: 0.1,
        tools: [{ googleSearch: {} }],
      }
    });

    return parseJsonResult(response.text || "{}");
}

export async function getLiveNews(language: string = "English"): Promise<any> {
    const prompt = `Use Google Search to find the 5 latest news headlines about Indian Elections, Election Commission of India, or Indian politics.
Respond ONLY with a JSON array of objects exactly like this:
[
  {
    "title": "Short headline",
    "summary": "1-2 sentence summary",
    "source": "News Source",
    "time": "e.g. 2 hours ago"
  }
]
Absolutely no other text. Translate the text into ${language} language.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        temperature: 0.2,
        tools: [{ googleSearch: {} }],
      }
    });

    return parseJsonResult(response.text || "[]");
}

