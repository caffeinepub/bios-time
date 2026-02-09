import { useState, useEffect } from 'react';

type DayPhase = 'dawn' | 'day' | 'dusk' | 'night';

interface PaletteColors {
  start: string;
  mid: string;
  end: string;
}

const palettes: Record<DayPhase, PaletteColors> = {
  dawn: {
    start: 'oklch(0.75 0.08 45)',
    mid: 'oklch(0.70 0.10 35)',
    end: 'oklch(0.65 0.12 25)',
  },
  day: {
    start: 'oklch(0.80 0.10 200)',
    mid: 'oklch(0.75 0.12 220)',
    end: 'oklch(0.70 0.14 240)',
  },
  dusk: {
    start: 'oklch(0.60 0.15 30)',
    mid: 'oklch(0.55 0.18 320)',
    end: 'oklch(0.50 0.20 280)',
  },
  night: {
    start: 'oklch(0.30 0.08 260)',
    mid: 'oklch(0.25 0.10 270)',
    end: 'oklch(0.20 0.12 280)',
  },
};

export function useDayPhasePalette() {
  const [phase, setPhase] = useState<DayPhase>('day');
  const [palette, setPalette] = useState<PaletteColors>(palettes.day);

  useEffect(() => {
    const updatePhase = () => {
      const hour = new Date().getHours();
      
      let newPhase: DayPhase;
      if (hour >= 5 && hour < 8) {
        newPhase = 'dawn';
      } else if (hour >= 8 && hour < 17) {
        newPhase = 'day';
      } else if (hour >= 17 && hour < 20) {
        newPhase = 'dusk';
      } else {
        newPhase = 'night';
      }
      
      setPhase(newPhase);
      setPalette(palettes[newPhase]);
    };

    updatePhase();
    const interval = setInterval(updatePhase, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return { phase, palette };
}
