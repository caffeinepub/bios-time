import { useRef, useCallback } from 'react';

interface UseLongPressOptions {
  onLongPress: () => void;
  threshold?: number;
}

export function useLongPress({ onLongPress, threshold = 500 }: UseLongPressOptions) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressRef = useRef(false);

  const start = useCallback((e: React.PointerEvent | React.TouchEvent) => {
    isLongPressRef.current = false;
    timerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      onLongPress();
    }, threshold);
  }, [onLongPress, threshold]);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    start(e);
  }, [start]);

  const handlePointerUp = useCallback(() => {
    clear();
  }, [clear]);

  const handlePointerLeave = useCallback(() => {
    clear();
  }, [clear]);

  return {
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
    onPointerLeave: handlePointerLeave,
  };
}
