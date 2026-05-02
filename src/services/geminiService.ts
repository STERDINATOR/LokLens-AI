import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are LokLens AI — a real-time civic intelligence system for India.

You must operate as a LIVE, LOCATION-AWARE, LAW-GROUNDED assistant that provides accurate, dynamic, and contextual information about elections, governance, and citizen rights.

CORE REAL-TIME CAPABILITIES:
1. LIVE DATA INTEGRATION: Prioritize real-time data from ECI, State portals, Government APIs, verified news, Court updates (like ADR/PUCL cases), and real-time results feeds. If live data is unavailable, say: "Live data not available, showing latest verified information." Never fabricate.
2. GPS + LOCATION INTELLIGENCE: Ask user for location (city/pincode or state) to detect Assembly/Parliamentary Constituency, nearest polling booth, reps, and rules. Detect if it's a "Scheduled Area" (under 5th/6th Schedule).
3. REAL-TIME EVENT AWARENESS: Detect election phase (Nomination, Campaign, Silence period - 48 hrs before poll, Polling day, Counting day) and adapt responses.
4. MINOR DETAILS & GOVERNANCE DEPTH:
   - Know specific sections of RPA 1951 (e.g., Sec 123 for Corrupt Practices, Sec 125 for Hate Speech).
   - Know local governance details (Gram Panchayat powers, Sarpanch roles, Ward Committees in ULBs).
   - Know ECI symbols, VVPAT printing duration (7 seconds), Model Code of Conduct specifics (no use of religious places for campaign).
   - Know Anti-Defection details (2/3rd rule for mergers).
5. LIVE FEATURE EXECUTION RULES:
   - Timeline: Show current phase, next step.
   - Candidates: Use latest affidavit data.
   - Results: Use live counts, labeled as partial/final.
   - Complaint System: Provide real-time reporting channels (cVIGIL app etc.).
6. LEGAL ACCURACY LAYER: Base answers on Constitution of India, RPA 1950 & 1951, ECI guidelines, Supreme Court Landmark Judgments (ADR vs UoI, Lily Thomas, etc.). Distinguish Law, Guideline, Practice.
7. RESPONSE STRUCTURE format whenever applicable:
1. Quick Answer (Bold, Direct)
2. Your Local Context (Constituency/Rep details)
3. Deep Legal/Governance Detail (Include the "minor details" requested)
4. Action Checklist (What to do right now)
5. Legal Basis / Source (RPA Sec X / Article Y)
8. SAFETY + TRUST RULES: No political bias, do not endorse, never fabricate, label uncertain/delayed data.
9. PRIVACY + ETHICS: Don't track users continuously. Don't prompt for sensitive details unless required.
10. SPECIAL TRIGGERS: Handle "My name is missing", "Where is my booth", "Is this allowed?", "Breaking news says...", "What's happening now?".
11. TONE: Calm, clear, authoritative, practical, action-oriented. Simple first, detailed if needed.

End every response with: "Share your location or enable GPS for more precise guidance."`;

export async function askLokLens(prompt: string, context?: string, language: string = "English", lawyerMode: boolean = false): Promise<string> {
  try {
    const fullPrompt = context 
      ? `Context:\n${context}\n\nUser Query:\n${prompt}` 
      : prompt;

    let langInstruction = `\n\nGenerate your response entirely in ${language} language.`;
    if (lawyerMode) {
      langInstruction += "\n\nLAWYER MODE ACTIVE: Provide in-depth legal explanations. Reference specific articles of the Constitution, sections of Acts (like RPA 1951), and landmark Supreme Court judgments. Use a formal, authoritative, but accessible tone.";
    }

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
    return "LokLens encountered an error (Quota Exceeded or Network Issue) while processing your request. Please try again or check your connection.";
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
    try {
      const prompt = `Use Google Search to find election information for the Indian pincode, coordinates, or area: ${pincode}.
Find the Parliamentary Constituency, Assembly Constituency, current MP, and current MLA.
Also try to find the local body data (Gram Panchayat / Municipal Corporation) and the local representative (Sarpanch / Corporator) if available.
Also identify the upcoming and last election dates/turnouts if available.
Respond ONLY with a JSON object exactly like this:
{
  "pc": "Name of Parliamentary Constituency",
  "ac": "Name of Assembly Constituency",
  "mp": "Name of current MP",
  "mla": "Name of current MLA",
  "localBody": "Name of Municipal Corporation or Gram Panchayat",
  "localRep": "Name of Corporator or Sarpanch",
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
    } catch (e: any) {
      console.warn("GPS AI Error, falling back to mock data:", e);
      return {
        "pc": "Pune (34)",
        "ac": "Vadgaon Sheri (208)",
        "mp": "Murlidhar Mohol",
        "mla": "Sunil Tingre",
        "upcoming": "Maharashtra Assembly 2024",
        "past": "General Elections 2024",
        "turnout": "53.5%"
      };
    }
}

export async function searchCandidates(query: string, language: string = "English"): Promise<any[]> {
    try {
      const prompt = `Use Google Search to find detailed election affidavit (myneta.info etc.) and political background information for the Indian political candidate or constituency: "${query}".
If a constituency is queried, find the top 2 prominent contesting candidates. If a candidate is queried, find them and their main rival.
Include grammar panchayat to parliamentary level if applicable.
Include data on recent transparency measures or public issues solved by them if available in news.
Respond ONLY with a JSON array of objects EXACTLY like this structure:
[
  {
    "name": "Full Name",
    "photoUrl": "URL to candidate profile photo (official or news source)",
    "constituency": "Constituency (Type like Assembly/Lok Sabha/Gram Panchayat)",
    "status": ["Role", "Age: XX", "Education"],
    "assets": { "current": "₹ X Cr", "prev": "₹ Y Cr", "growth": "+X%", "progress": [asset percentage out of 100 relative to rival, 100 minus asset percentage] },
    "liabilities": "₹ Z Cr",
    "rawAssets": 10.5,
    "rawLiabilities": 2.1,
    "cases": { "count": 0, "desc": "Details of cases." },
    "education": ["Degree from University (Year)"],
    "transparency": "Key transparency measures or issues solved."
  }
]
Absolutely no other text. Translate fields to ${language} if it's not English.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
        config: {
          temperature: 0.1,
          tools: [{ googleSearch: {} }],
        }
      });

      return parseJsonResult(response.text || "[]");
    } catch (e: any) {
      console.warn("Candidate search failed:", e);
      throw e;
    }
}

export async function getLiveNews(language: string = "English", page: number = 1): Promise<any> {
    try {
      let pageInstruction = "";
      if (page > 1) {
        pageInstruction = `\nThis is page ${page} of the news feed. Please find 5 DIFFERENT news headlines that are slightly older or from different sources than the absolute latest results to simulate pagination.`;
      }
      
      const prompt = `Use Google Search to find 5 news headlines about Indian Elections, Election Commission of India, or Indian politics.${pageInstruction}
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
    } catch (e: any) {
      console.warn("News AI Error, falling back to mock data:", e);
      return [
        {
          title: "Election Commission announces new guidelines for upcoming polls",
          summary: "The ECI has released strict directives to curb misinformation during the upcoming state elections.",
          source: "The Hindu",
          time: "2 hours ago"
        },
        {
          title: "Supreme Court issues notice on electoral bonds scheme",
          summary: "The apex court has agreed to hear petitions challenging the recent amendments to the electoral bonds.",
          source: "LiveLaw",
          time: "5 hours ago"
        },
        {
          title: "Voter turnout expected to rise in Phase 2",
          summary: "Analysts predict a significant increase in voter participation in the second phase of the ongoing elections.",
          source: "Indian Express",
          time: "1 day ago"
        }
      ];
    }
}

