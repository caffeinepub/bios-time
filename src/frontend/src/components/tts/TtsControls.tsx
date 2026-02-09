import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square } from 'lucide-react';
import { useTtsContext } from '../../state/tts/TtsProvider';
import { createSpeechSynthesisController } from '../../utils/tts/speechSynthesis';

interface TtsControlsProps {
  text: string;
  className?: string;
}

export default function TtsControls({ text, className = '' }: TtsControlsProps) {
  const { enabled, supported } = useTtsContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (supported && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [supported]);

  if (!enabled) {
    return null;
  }

  if (!supported) {
    return (
      <div className={`text-xs text-amber-800 italic ${className}`}>
        Text-to-speech is not supported in your browser.
      </div>
    );
  }

  const controller = createSpeechSynthesisController();
  if (!controller) {
    return null;
  }

  const handlePlay = () => {
    if (isPaused) {
      controller.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      controller.speak(text);
      setIsPlaying(true);
      setIsPaused(false);
      
      // Monitor speech end
      const checkSpeech = setInterval(() => {
        if (!controller.isSpeaking()) {
          setIsPlaying(false);
          setIsPaused(false);
          clearInterval(checkSpeech);
        }
      }, 100);
    }
  };

  const handlePause = () => {
    controller.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    controller.stop();
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {!isPlaying && !isPaused && (
        <Button
          variant="outline"
          size="sm"
          onClick={handlePlay}
          className="border-amber-700 text-amber-700 hover:bg-amber-100/50"
        >
          <Play className="w-4 h-4 mr-1" />
          Listen
        </Button>
      )}
      {isPlaying && (
        <Button
          variant="outline"
          size="sm"
          onClick={handlePause}
          className="border-amber-700 text-amber-700 hover:bg-amber-100/50"
        >
          <Pause className="w-4 h-4 mr-1" />
          Pause
        </Button>
      )}
      {isPaused && (
        <Button
          variant="outline"
          size="sm"
          onClick={handlePlay}
          className="border-amber-700 text-amber-700 hover:bg-amber-100/50"
        >
          <Play className="w-4 h-4 mr-1" />
          Resume
        </Button>
      )}
      {(isPlaying || isPaused) && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleStop}
          className="border-amber-700 text-amber-700 hover:bg-amber-100/50"
        >
          <Square className="w-4 h-4 mr-1" />
          Stop
        </Button>
      )}
    </div>
  );
}
