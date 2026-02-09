import { useState, useEffect } from 'react';

export function useLandscapeTrigger() {
  const [isLandscape, setIsLandscape] = useState(false);
  const [isSupported] = useState(() => typeof window !== 'undefined' && 'matchMedia' in window);

  useEffect(() => {
    if (!isSupported) return;

    const mediaQuery = window.matchMedia('(orientation: landscape)');
    
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsLandscape(e.matches);
    };

    handleChange(mediaQuery);
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Legacy browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [isSupported]);

  return {
    isLandscape,
    isSupported,
  };
}
