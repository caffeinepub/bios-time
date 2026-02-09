import { useState, useEffect } from 'react';

export function useNowTicker(intervalMs: number = 1000): Date {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return now;
}
