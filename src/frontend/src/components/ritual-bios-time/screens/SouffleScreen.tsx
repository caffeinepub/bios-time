import { useEffect, useRef, useState } from 'react';
import { useLongPress } from '../../../hooks/useLongPress';
import { useI18n } from '../../../state/i18n/useI18n';

interface SouffleScreenProps {
  onLongPress: () => void;
}

export default function SouffleScreen({ onLongPress }: SouffleScreenProps) {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'aligned' | 'recovery' | 'alert'>('aligned');
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef(Date.now());

  const longPressHandlers = useLongPress({
    onLongPress,
    threshold: 800,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;
    const oculusRadius = 80;
    const orbitRadius = 150;

    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Pulsing Oculus (7.83 Hz approximation via visual pulse)
      const pulsePhase = (elapsed * 7.83) % 1;
      const pulseScale = 1 + Math.sin(pulsePhase * Math.PI * 2) * 0.08;
      const currentRadius = oculusRadius * pulseScale;

      // Oculus color based on status
      let oculusColor = 'oklch(0.75 0.15 45)'; // Golden/Amber for aligned
      if (status === 'recovery') {
        oculusColor = 'oklch(0.55 0.12 260)'; // Blue/Violet for recovery
      } else if (status === 'alert') {
        oculusColor = 'oklch(0.60 0.18 25)'; // Red/Orange for alert
      }

      // Draw Oculus with glow
      ctx.shadowBlur = 30;
      ctx.shadowColor = oculusColor;
      ctx.fillStyle = oculusColor;
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Orbiting Sun (circle)
      const sunAngle = elapsed * 0.3;
      const sunX = centerX + Math.cos(sunAngle) * orbitRadius;
      const sunY = centerY + Math.sin(sunAngle) * orbitRadius;
      
      const sunImg = new Image();
      sunImg.src = '/assets/generated/sun-glyph.dim_256x256.png';
      ctx.drawImage(sunImg, sunX - 20, sunY - 20, 40, 40);

      // Orbiting Moon (crescent)
      const moonAngle = elapsed * 0.2 + Math.PI;
      const moonX = centerX + Math.cos(moonAngle) * orbitRadius;
      const moonY = centerY + Math.sin(moonAngle) * orbitRadius;
      
      const moonImg = new Image();
      moonImg.src = '/assets/generated/moon-glyph.dim_256x256.png';
      ctx.drawImage(moonImg, moonX - 20, moonY - 20, 40, 40);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [status]);

  const statusText = status === 'aligned' 
    ? t('ritual.souffle.aligned')
    : status === 'recovery'
    ? t('ritual.souffle.recovery')
    : t('ritual.souffle.alert');

  return (
    <div className="ritual-screen souffle-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <div 
          className="relative cursor-pointer"
          {...longPressHandlers}
        >
          <canvas
            ref={canvasRef}
            className="w-[400px] h-[400px] max-w-[90vw] max-h-[90vw]"
          />
        </div>
        
        <p className="ritual-status-text mt-8">
          {statusText}
        </p>
        
        <p className="ritual-hint-text mt-4 opacity-60">
          {t('ritual.souffle.hint')}
        </p>
      </div>
    </div>
  );
}
