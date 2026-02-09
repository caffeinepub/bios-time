import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Compass } from 'lucide-react';
import { usePointerDragVector } from '../../../hooks/usePointerDragVector';
import { useRitualAudio } from '../../../hooks/useRitualAudio';
import { useVibrationFeedback } from '../../../hooks/useVibrationFeedback';
import { useI18n } from '../../../state/i18n/useI18n';
import RitualNotices from '../RitualNotices';

interface BloomScreenProps {
  onRelease: () => void;
  onEnterCompass: () => void;
  showCompassEntry: boolean;
}

export default function BloomScreen({ onRelease, onEnterCompass, showCompassEntry }: BloomScreenProps) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPetal, setSelectedPetal] = useState<number | null>(null);
  const { startDrag, endDrag, isDragging, direction } = usePointerDragVector();
  const { start: startAudio, stop: stopAudio, isSupported: audioSupported } = useRitualAudio();
  const { vibrate } = useVibrationFeedback();
  const [audioError, setAudioError] = useState(false);

  // Metamorphosis animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Start audio and haptics when bloom opens
  useEffect(() => {
    if (isOpen) {
      vibrate([50, 100, 50]); // Opening pattern
      startAudio().catch(() => setAudioError(true));
    }
    return () => {
      stopAudio();
    };
  }, [isOpen, startAudio, stopAudio, vibrate]);

  // Detect petal selection from drag direction
  useEffect(() => {
    if (isDragging && direction) {
      const angle = Math.atan2(direction.y, direction.x);
      const degrees = (angle * 180 / Math.PI + 360) % 360;
      
      // North: 60-120, East: 330-30, West: 150-210
      if (degrees >= 60 && degrees <= 120) {
        setSelectedPetal(0); // North/Sky
      } else if ((degrees >= 330 && degrees <= 360) || (degrees >= 0 && degrees <= 30)) {
        setSelectedPetal(1); // East/Body
      } else if (degrees >= 150 && degrees <= 210) {
        setSelectedPetal(2); // West/Earth
      }
    }
  }, [isDragging, direction]);

  const handlePointerDown = (e: React.PointerEvent) => {
    startDrag(e);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // Drag tracking handled by hook
  };

  const handlePointerUp = () => {
    endDrag();
    setSelectedPetal(null);
    
    // Absorb animation and close
    vibrate([100, 50]); // Closing pattern
    setIsOpen(false);
    setTimeout(onRelease, 600);
  };

  const petals = [
    {
      title: t('ritual.bloom.petal.sky'),
      value: t('ritual.bloom.petal.skyValue'),
      icon: '/assets/generated/tide-icon.dim_256x256.png',
    },
    {
      title: t('ritual.bloom.petal.body'),
      value: t('ritual.bloom.petal.bodyValue'),
      icon: '/assets/generated/shield-cracked-icon.dim_256x256.png',
    },
    {
      title: t('ritual.bloom.petal.earth'),
      value: t('ritual.bloom.petal.earthValue'),
      icon: '/assets/generated/shield-cracked-icon.dim_256x256.png',
    },
  ];

  return (
    <div className="ritual-screen bloom-screen">
      {audioError && (
        <RitualNotices 
          notices={[{ type: 'audio', message: t('ritual.notice.audioInteraction') }]}
        />
      )}
      
      <div 
        className="flex flex-col items-center justify-center h-full relative"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Central receptacle */}
        <div className={`ritual-oculus-receptacle ${isOpen ? 'open' : ''}`}>
          <div className="ritual-oculus-core" />
        </div>

        {/* Orbiting petals */}
        <div className={`ritual-petals-container ${isOpen ? 'open' : ''}`}>
          {petals.map((petal, index) => (
            <div
              key={index}
              className={`ritual-petal ritual-petal-${index} ${selectedPetal === index ? 'selected' : ''}`}
              style={{
                transform: `rotate(${index * 120}deg) translateY(-180px) rotate(-${index * 120}deg)`,
              }}
            >
              <div className="ritual-glass-panel p-4">
                <img src={petal.icon} alt="" className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <h3 className="ritual-petal-title">{petal.title}</h3>
                <p className="ritual-petal-value">{petal.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Manual compass entry */}
        {showCompassEntry && isOpen && (
          <div className="absolute bottom-8">
            <Button
              onClick={onEnterCompass}
              className="ritual-glass-button"
            >
              <Compass className="w-5 h-5 mr-2" />
              {t('ritual.bloom.enterCompass')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
