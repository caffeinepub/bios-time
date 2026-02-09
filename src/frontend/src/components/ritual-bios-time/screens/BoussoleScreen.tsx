import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, RotateCw } from 'lucide-react';
import { useOrientationOrSimulatedHeading } from '../../../hooks/useOrientationOrSimulatedHeading';
import { useCompassSpatialAudio } from '../../../hooks/useCompassSpatialAudio';
import { useVibrationFeedback } from '../../../hooks/useVibrationFeedback';
import { useI18n } from '../../../state/i18n/useI18n';
import RitualNotices from '../RitualNotices';

interface BoussoleScreenProps {
  onExit: () => void;
}

export default function BoussoleScreen({ onExit }: BoussoleScreenProps) {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { heading, isSimulated, simulatedHeading, setSimulatedHeading } = useOrientationOrSimulatedHeading();
  const [targetHeading] = useState(180); // South for sun alignment example
  const [isLocked, setIsLocked] = useState(false);
  const { updateAlignment, lock, unlock } = useCompassSpatialAudio();
  const { vibrate } = useVibrationFeedback();
  const animationFrameRef = useRef<number | null>(null);

  // Calculate alignment
  const alignment = Math.abs(((heading - targetHeading + 180) % 360) - 180);
  const isAligned = alignment < 15; // 15 degree tolerance

  useEffect(() => {
    if (isAligned && !isLocked) {
      setIsLocked(true);
      lock();
      vibrate([100, 50, 100]); // Double clap pattern
    } else if (!isAligned && isLocked) {
      setIsLocked(false);
      unlock();
    }
  }, [isAligned, isLocked, lock, unlock, vibrate]);

  // Update spatial audio
  useEffect(() => {
    updateAlignment(alignment, isLocked);
  }, [alignment, isLocked, updateAlignment]);

  // Canvas rendering
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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Luminous ring
      const ringRadius = 100;
      ctx.strokeStyle = isLocked ? 'oklch(0.95 0.05 60)' : 'oklch(0.75 0.10 200)';
      ctx.lineWidth = 3;
      ctx.shadowBlur = isLocked ? 40 : 20;
      ctx.shadowColor = ctx.strokeStyle;
      ctx.beginPath();
      ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Particle ray
      const rayAngle = (heading * Math.PI) / 180;
      const rayLength = isLocked ? 200 : 150;
      const rayEndX = centerX + Math.cos(rayAngle - Math.PI / 2) * rayLength;
      const rayEndY = centerY + Math.sin(rayAngle - Math.PI / 2) * rayLength;

      // Draw particles along ray
      const particleCount = isLocked ? 20 : 10;
      for (let i = 0; i < particleCount; i++) {
        const t = i / particleCount;
        const px = centerX + (rayEndX - centerX) * t;
        const py = centerY + (rayEndY - centerY) * t;
        const size = isLocked ? 4 : 2;
        
        ctx.fillStyle = isLocked ? 'oklch(0.95 0.05 60 / 0.8)' : 'oklch(0.75 0.10 200 / 0.6)';
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Lock pillar effect
      if (isLocked) {
        ctx.strokeStyle = 'oklch(0.98 0.02 60)';
        ctx.lineWidth = 8;
        ctx.shadowBlur = 60;
        ctx.shadowColor = 'oklch(0.95 0.05 60)';
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(rayEndX, rayEndY);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [heading, isLocked]);

  return (
    <div className="ritual-screen boussole-screen">
      {isSimulated && (
        <RitualNotices 
          notices={[{ type: 'orientation', message: t('ritual.notice.orientationSimulated') }]}
        />
      )}

      <div className="flex flex-col items-center justify-center h-full">
        <canvas
          ref={canvasRef}
          className="w-[400px] h-[400px] max-w-[90vw] max-h-[90vw]"
        />

        <div className="mt-8 text-center">
          <p className="ritual-status-text">
            {isLocked ? t('ritual.boussole.locked') : t('ritual.boussole.seeking')}
          </p>
          <p className="ritual-hint-text mt-2 opacity-60">
            {t('ritual.boussole.hint')}
          </p>
        </div>

        {/* Simulated heading control */}
        {isSimulated && (
          <div className="absolute bottom-20 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSimulatedHeading((simulatedHeading - 15 + 360) % 360)}
              className="ritual-glass-button"
            >
              <RotateCw className="w-5 h-5 transform -scale-x-100" />
            </Button>
            <span className="ritual-glass-panel px-4 py-2 min-w-[80px] text-center">
              {Math.round(simulatedHeading)}°
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSimulatedHeading((simulatedHeading + 15) % 360)}
              className="ritual-glass-button"
            >
              <RotateCw className="w-5 h-5" />
            </Button>
          </div>
        )}

        <Button
          onClick={onExit}
          className="absolute bottom-4 ritual-glass-button"
        >
          <X className="w-5 h-5 mr-2" />
          {t('ritual.boussole.exit')}
        </Button>
      </div>
    </div>
  );
}
