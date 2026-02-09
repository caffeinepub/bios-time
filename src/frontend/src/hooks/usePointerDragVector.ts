import { useState, useCallback, useRef } from 'react';

interface DragVector {
  x: number;
  y: number;
}

export function usePointerDragVector() {
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState<DragVector | null>(null);
  const startPosRef = useRef<DragVector | null>(null);

  const startDrag = useCallback((e: React.PointerEvent) => {
    startPosRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    setDirection(null);
  }, []);

  const updateDrag = useCallback((e: React.PointerEvent) => {
    if (!startPosRef.current) return;
    
    const dx = e.clientX - startPosRef.current.x;
    const dy = e.clientY - startPosRef.current.y;
    const magnitude = Math.sqrt(dx * dx + dy * dy);
    
    if (magnitude > 20) {
      setDirection({
        x: dx / magnitude,
        y: dy / magnitude,
      });
    }
  }, []);

  const endDrag = useCallback(() => {
    setIsDragging(false);
    setDirection(null);
    startPosRef.current = null;
  }, []);

  return {
    isDragging,
    direction,
    startDrag,
    updateDrag,
    endDrag,
  };
}
