export interface SpeechSynthesisController {
  speak: (text: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  isSpeaking: () => boolean;
  isPaused: () => boolean;
}

export function isSpeechSynthesisSupported(): boolean {
  return 'speechSynthesis' in window;
}

export function createSpeechSynthesisController(): SpeechSynthesisController | null {
  if (!isSpeechSynthesisSupported()) {
    return null;
  }

  const synth = window.speechSynthesis;

  return {
    speak: (text: string) => {
      // Cancel any ongoing speech
      synth.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      synth.speak(utterance);
    },
    
    pause: () => {
      if (synth.speaking && !synth.paused) {
        synth.pause();
      }
    },
    
    resume: () => {
      if (synth.paused) {
        synth.resume();
      }
    },
    
    stop: () => {
      synth.cancel();
    },
    
    isSpeaking: () => {
      return synth.speaking;
    },
    
    isPaused: () => {
      return synth.paused;
    },
  };
}
