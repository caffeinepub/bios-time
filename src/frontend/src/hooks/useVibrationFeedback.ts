import { useCallback } from 'react';

export function useVibrationFeedback() {
  const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator;

  const vibrate = useCallback((pattern: number | number[]) => {
    if (!isSupported) return;
    
    try {
      navigator.vibrate(pattern);
    } catch (error) {
      console.warn('Vibration failed:', error);
    }
  }, [isSupported]);

  return {
    vibrate,
    isSupported,
  };
}
