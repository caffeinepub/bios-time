const UI_LANGUAGE_KEY = 'bios-time-ui-language';

export type UILanguage = 'en' | 'fr';

function detectBrowserLanguage(): UILanguage {
  if (typeof navigator === 'undefined') return 'en';
  
  const browserLang = navigator.language || (navigator as any).userLanguage;
  if (browserLang && browserLang.toLowerCase().startsWith('fr')) {
    return 'fr';
  }
  return 'en';
}

export function getUILanguage(): UILanguage {
  try {
    const stored = localStorage.getItem(UI_LANGUAGE_KEY);
    if (stored === 'en' || stored === 'fr') {
      return stored; // Saved preference always wins
    }
  } catch (error) {
    console.error('Failed to read UI language preference:', error);
  }
  
  // No saved preference: detect from browser
  return detectBrowserLanguage();
}

export function setUILanguage(language: UILanguage): void {
  try {
    localStorage.setItem(UI_LANGUAGE_KEY, language);
  } catch (error) {
    console.error('Failed to save UI language preference:', error);
  }
}
