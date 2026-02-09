import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getUILanguage, setUILanguage, UILanguage } from '../preferences/uiLanguage';
import { translate, TranslationKey } from './strings';

interface I18nContextValue {
  language: UILanguage;
  setLanguage: (lang: UILanguage) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<UILanguage>(() => getUILanguage());

  const handleSetLanguage = (lang: UILanguage) => {
    setUILanguage(lang);
    setLanguageState(lang);
  };

  const t = (key: TranslationKey): string => {
    return translate(key, language);
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18nContext() {
  const context = React.useContext(I18nContext);
  if (!context) {
    throw new Error('useI18nContext must be used within I18nProvider');
  }
  return context;
}
