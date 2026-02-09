import { useRef, useCallback, useEffect } from 'react';

export function useCompassSpatialAudio() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const pannerRef = useRef<StereoPannerNode | null>(null);
  const isInitializedRef = useRef(false);

  const initialize = useCallback(() => {
    if (isInitializedRef.current) return;

    try {
      const AudioContextClass = AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
      const ctx = audioContextRef.current;

      // Create nodes
      oscillatorRef.current = ctx.createOscillator();
      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.frequency.value = 432; // Singing bowl frequency

      gainNodeRef.current = ctx.createGain();
      gainNodeRef.current.gain.value = 0;

      pannerRef.current = ctx.createStereoPanner();
      pannerRef.current.pan.value = 0;

      // Connect: oscillator -> gain -> panner -> destination
      oscillatorRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(pannerRef.current);
      pannerRef.current.connect(ctx.destination);

      oscillatorRef.current.start();
      isInitializedRef.current = true;
    } catch (error) {
      console.error('Failed to initialize compass audio:', error);
    }
  }, []);

  useEffect(() => {
    initialize();

    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch (e) {
          // Ignore
        }
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      isInitializedRef.current = false;
    };
  }, [initialize]);

  const updateAlignment = useCallback((alignmentError: number, isLocked: boolean) => {
    if (!gainNodeRef.current || !pannerRef.current) return;

    // Normalize alignment error (0-180 degrees)
    const normalizedError = Math.min(alignmentError, 180) / 180;

    // Volume: louder when closer to alignment
    const targetVolume = isLocked ? 0.3 : (1 - normalizedError) * 0.2;
    gainNodeRef.current.gain.linearRampToValueAtTime(
      targetVolume,
      audioContextRef.current!.currentTime + 0.1
    );

    // Pan: center when aligned, drift when off
    const targetPan = isLocked ? 0 : (Math.random() - 0.5) * normalizedError;
    pannerRef.current.pan.linearRampToValueAtTime(
      targetPan,
      audioContextRef.current!.currentTime + 0.1
    );
  }, []);

  const lock = useCallback(() => {
    if (!gainNodeRef.current || !pannerRef.current) return;

    // Lock: centered, stable, clear
    gainNodeRef.current.gain.linearRampToValueAtTime(
      0.3,
      audioContextRef.current!.currentTime + 0.05
    );
    pannerRef.current.pan.linearRampToValueAtTime(
      0,
      audioContextRef.current!.currentTime + 0.05
    );
  }, []);

  const unlock = useCallback(() => {
    if (!gainNodeRef.current) return;

    gainNodeRef.current.gain.linearRampToValueAtTime(
      0.1,
      audioContextRef.current!.currentTime + 0.1
    );
  }, []);

  return {
    updateAlignment,
    lock,
    unlock,
  };
}
