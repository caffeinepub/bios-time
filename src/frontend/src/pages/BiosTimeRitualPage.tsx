import { useState, useEffect } from 'react';
import BiosTimeRitualShell from '../components/ritual-bios-time/BiosTimeRitualShell';
import SouffleScreen from '../components/ritual-bios-time/screens/SouffleScreen';
import BloomScreen from '../components/ritual-bios-time/screens/BloomScreen';
import BoussoleScreen from '../components/ritual-bios-time/screens/BoussoleScreen';
import { useLandscapeTrigger } from '../hooks/useLandscapeTrigger';

type RitualState = 'souffle' | 'bloom' | 'boussole';

export default function BiosTimeRitualPage() {
  const [ritualState, setRitualState] = useState<RitualState>('souffle');
  const { isLandscape, isSupported } = useLandscapeTrigger();

  // Auto-enter Boussole when landscape is detected
  useEffect(() => {
    if (isLandscape && ritualState === 'bloom') {
      setRitualState('boussole');
    }
  }, [isLandscape, ritualState]);

  const handleSouffleLongPress = () => {
    setRitualState('bloom');
  };

  const handleBloomRelease = () => {
    setRitualState('souffle');
  };

  const handleEnterCompass = () => {
    setRitualState('boussole');
  };

  const handleExitCompass = () => {
    setRitualState('bloom');
  };

  return (
    <BiosTimeRitualShell>
      {ritualState === 'souffle' && (
        <SouffleScreen onLongPress={handleSouffleLongPress} />
      )}
      {ritualState === 'bloom' && (
        <BloomScreen 
          onRelease={handleBloomRelease}
          onEnterCompass={handleEnterCompass}
          showCompassEntry={!isSupported || !isLandscape}
        />
      )}
      {ritualState === 'boussole' && (
        <BoussoleScreen onExit={handleExitCompass} />
      )}
    </BiosTimeRitualShell>
  );
}
