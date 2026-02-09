import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getTtsEnabled, setTtsEnabled } from '../preferences/ttsSettings';
import { isSpeechSynthesisSupported } from '../../utils/tts/speechSynthesis';

interface TtsContextValue {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  supported: boolean;
}

const TtsContext = createContext<TtsContextValue | undefined>(undefined);

export function TtsProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState<boolean>(getTtsEnabled());
  const [supported] = useState<boolean>(isSpeechSynthesisSupported());

  const handleSetEnabled = (newEnabled: boolean) => {
    setTtsEnabled(newEnabled);
    setEnabledState(newEnabled);
  };

  return (
    <TtsContext.Provider value={{ enabled, setEnabled: handleSetEnabled, supported }}>
      {children}
    </TtsContext.Provider>
  );
}

export function useTtsContext() {
  const context = React.useContext(TtsContext);
  if (!context) {
    throw new Error('useTtsContext must be used within TtsProvider');
  }
  return context;
}
