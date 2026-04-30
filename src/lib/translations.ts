export type Language = 'en' | 'hi' | 'mr';

const EN = {
  "nav.home": "Home",
  "nav.gps": "Democracy GPS",
  "nav.timeline": "Election Timeline",
  "nav.ask": "Ask LokLens",
  "nav.candidate": "Candidate Truth",
  "nav.learn": "Learn Law",
  "nav.panic": "Panic Mode",
  "nav.news": "Live News",
  "app.title": "Maharashtra Assembly Elections",
  "gps.title": "Real-time Democracy GPS",
  "gps.subtitle": "Find your constituency, representatives, and live polling info powered by AI search.",
  "lang.en": "English",
  "lang.hi": "हिंदी",
  "lang.mr": "मराठी",
};

const HI = {
  "nav.home": "होम",
  "nav.gps": "लोकतंत्र जीपीएस",
  "nav.timeline": "चुनाव समयरेखा",
  "nav.ask": "लोकलेन्स से पूछें",
  "nav.candidate": "उम्मीदवार की सच्चाई",
  "nav.learn": "कानून सीखें",
  "nav.panic": "आपातकालीन मोड",
  "nav.news": "ताज़ा ख़बरें",
  "app.title": "महाराष्ट्र विधानसभा चुनाव",
  "gps.title": "रीयल-टाइम लोकतंत्र जीपीएस",
  "gps.subtitle": "एआई खोज द्वारा संचालित अपना निर्वाचन क्षेत्र, प्रतिनिधि और लाइव मतदान जानकारी प्राप्त करें।",
  "lang.en": "English",
  "lang.hi": "हिंदी",
  "lang.mr": "मराठी",
};

const MR = {
  "nav.home": "मुख्यपृष्ठ",
  "nav.gps": "लोकशाही जीपीएस",
  "nav.timeline": "निवडणूक वेळमर्यादा",
  "nav.ask": "लोकलेन्सला विचारा",
  "nav.candidate": "उमेदवाराचे सत्य",
  "nav.learn": "कायदा शिका",
  "nav.panic": "धोका मोड",
  "nav.news": "ताज्या बातम्या",
  "app.title": "महाराष्ट्र विधानसभा निवडणुका",
  "gps.title": "रिअल-टाइम लोकशाही जीपीएस",
  "gps.subtitle": "AI शोधाद्वारे समर्थित तुमचा मतदारसंघ, प्रतिनिधी आणि थेट मतदान माहिती शोधा.",
  "lang.en": "English",
  "lang.hi": "हिंदी",
  "lang.mr": "मराठी",
};

export const dict = { en: EN, hi: HI, mr: MR };
export const t = (key: keyof typeof EN, lang: Language) => dict[lang][key] || dict['en'][key] || key;
