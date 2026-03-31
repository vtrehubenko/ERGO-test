/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import en from '../translations/en.json';
import pl from '../translations/pl.json';

export type Language = 'en' | 'pl';

type Translations = Record<string, string>;

const translationMap: Record<Language, Translations> = { en, pl };

function detectLanguage(): Language {
  const browserLang = navigator.language;
  return browserLang.startsWith('pl') ? 'pl' : 'en';
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(detectLanguage);

  function t(key: string): string {
    return translationMap[language][key] ?? key;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
