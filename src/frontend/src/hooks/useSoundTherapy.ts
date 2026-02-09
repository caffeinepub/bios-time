import { useState, useRef, useCallback } from 'react';

export function useSoundTherapy() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback((frequency: number, durationMinutes: number) => {
    if (audioContextRef.current) {
      stop();
    }

    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();

    audioContextRef.current = audioContext;
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
    setIsPlaying(true);

    timeoutRef.current = setTimeout(() => {
      stop();
    }, durationMinutes * 60 * 1000);
  }, []);

  const pause = useCallback(() => {
    if (audioContextRef.current) {
      audioContextRef.current.suspend();
      setIsPlaying(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }

    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setIsPlaying(false);
  }, []);

  return { isPlaying, start, pause, stop };
}
