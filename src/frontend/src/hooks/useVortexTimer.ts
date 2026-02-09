import { useState, useEffect, useRef } from 'react';

type Phase = 'focus' | 'release';

export function useVortexTimer(cycleLength: number) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('focus');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    const focusDuration = Math.floor(cycleLength * 0.75);
    setPhase('focus');
    setTimeRemaining(focusDuration * 60);
    setIsActive(true);
  };

  const stop = () => {
    setIsActive(false);
    setTimeRemaining(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          if (phase === 'focus') {
            const releaseDuration = Math.floor(cycleLength * 0.25);
            setPhase('release');
            return releaseDuration * 60;
          } else {
            stop();
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, phase, cycleLength]);

  return { isActive, phase, timeRemaining, start, stop };
}
