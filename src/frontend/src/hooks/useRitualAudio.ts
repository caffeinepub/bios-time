import { useRef, useCallback, useState } from 'react';

export function useRitualAudio() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported] = useState(() => typeof AudioContext !== 'undefined' || typeof (window as any).webkitAudioContext !== 'undefined');

  const start = useCallback(async () => {
    if (!isSupported) return;

    try {
      const AudioContextClass = AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
      const ctx = audioContextRef.current;

      // Resume context (required for autoplay policy)
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      // Create gain node for volume control
      gainNodeRef.current = ctx.createGain();
      gainNodeRef.current.gain.value = 0.15;
      gainNodeRef.current.connect(ctx.destination);

      // Hang drum-like harmonic pad (simplified)
      const frequencies = [432, 540, 648, 810]; // Harmonics based on 432 Hz
      
      frequencies.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        const oscGain = ctx.createGain();
        oscGain.gain.value = 0.25 / (index + 1); // Decreasing amplitude for harmonics
        
        osc.connect(oscGain);
        oscGain.connect(gainNodeRef.current!);
        osc.start();
        
        oscillatorsRef.current.push(osc);
      });

      setIsPlaying(true);
    } catch (error) {
      console.error('Failed to start ritual audio:', error);
      throw error;
    }
  }, [isSupported]);

  const stop = useCallback(() => {
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // Ignore if already stopped
      }
    });
    oscillatorsRef.current = [];

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setIsPlaying(false);
  }, []);

  return {
    start,
    stop,
    isPlaying,
    isSupported,
  };
}
