import React, { createContext, useContext, useState } from 'react';
import { Language } from '../lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  langName: string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  langName: 'English'
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const langName = language === 'en' ? 'English' : language === 'hi' ? 'हिंदी' : 'मराठी';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, langName }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
