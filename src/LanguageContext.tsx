import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { PROFILE, PROJECTS, TIMELINE_ITEMS } from './data/portfolioData';
import { PROJECTS_KA, TIMELINE_ITEMS_KA } from './data/portfolioKa';
import { UI_KA } from './data/uiKa';

export type Language = 'en' | 'ka';
type Translate = (text: string, values?: Record<string, string | number>) => string;
const STORAGE_KEY = 'portfolio-language';

function initialLanguage(): Language {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'ka' ? 'ka' : 'en';
  } catch {
    return 'en';
  }
}

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translate;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'ka'
      ? 'დაჩი ჭოტაშვილი — ჩაშენებული სისტემები, რობოტიკა და ხელოვნური ინტელექტი'
      : 'Dachi Tchotashvili — Embedded Systems, Robotics & AI';
    document.querySelector('meta[name="description"]')?.setAttribute('content', language === 'ka'
      ? 'დაჩი ჭოტაშვილი — ხელოვნური ინტელექტის ინჟინერიის სტუდენტი და რობოტიკის მკვლევარი MBZUAI-ში, Sherekilebi Labs-ის დამფუძნებელი.'
      : 'Dachi Tchotashvili — AI Engineering student and robotics researcher at MBZUAI, Founder of Sherekilebi Labs.');
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // The toggle still works when browser storage is unavailable.
    }
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: ((text, values) => {
      const translated = language === 'ka' ? UI_KA[text] ?? text : text;
      return translated.replace(/\{(\w+)\}/g, (placeholder, key: string) => String(values?.[key] ?? placeholder));
    }) as Translate,
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}

export function usePortfolio() {
  const { language } = useLanguage();
  return {
    profile: language === 'ka' ? { ...PROFILE, name: 'დაჩი ჭოტაშვილი', heroName: 'დაჩი ჭოტაშვილი' } : PROFILE,
    projects: language === 'ka' ? PROJECTS_KA : PROJECTS,
    timeline: language === 'ka' ? TIMELINE_ITEMS_KA : TIMELINE_ITEMS,
  };
}
