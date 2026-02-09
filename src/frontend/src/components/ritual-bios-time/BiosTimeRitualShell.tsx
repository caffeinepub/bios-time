import { ReactNode, useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { X, Volume2, VolumeX } from 'lucide-react';
import { useDayPhasePalette } from '../../hooks/useDayPhasePalette';
import { useI18n } from '../../state/i18n/useI18n';

interface BiosTimeRitualShellProps {
  children: ReactNode;
}

export default function BiosTimeRitualShell({ children }: BiosTimeRitualShellProps) {
  const navigate = useNavigate();
  const { phase, palette } = useDayPhasePalette();
  const { t } = useI18n();
  const [isMuted, setIsMuted] = useState(false);

  // Apply ritual theme class to body
  useEffect(() => {
    document.body.classList.add('ritual-active');
    return () => {
      document.body.classList.remove('ritual-active');
    };
  }, []);

  const handleExit = () => {
    navigate({ to: '/' });
  };

  return (
    <div 
      className="ritual-shell fixed inset-0 z-50"
      style={{
        background: `linear-gradient(135deg, ${palette.start}, ${palette.mid}, ${palette.end})`,
      }}
    >
      {/* Animated gradient overlay */}
      <div className="ritual-gradient-overlay" />
      
      {/* Header controls */}
      <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleExit}
          className="ritual-glass-button"
          aria-label={t('ritual.exit')}
        >
          <X className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMuted(!isMuted)}
          className="ritual-glass-button"
          aria-label={isMuted ? t('ritual.unmute') : t('ritual.mute')}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
      </div>

      {/* Main ritual content */}
      <div className="ritual-content-wrapper">
        {children}
      </div>

      {/* Global mute state provider via context would go here in production */}
      <div data-ritual-muted={isMuted} className="hidden" />
    </div>
  );
}
