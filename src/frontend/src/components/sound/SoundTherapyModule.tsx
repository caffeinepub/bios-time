import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Play, Pause, Square, Volume2 } from 'lucide-react';
import { useSoundTherapy } from '../../hooks/useSoundTherapy';
import { getSoundSafetyAcknowledged, setSoundSafetyAcknowledged } from '../../state/preferences/soundSafetyNotice';
import { soundTherapyPresets } from '../../utils/audio/soundTherapyPresets';

export default function SoundTherapyModule() {
  const [mode, setMode] = useState<'solfeggio' | 'neuroscience'>('solfeggio');
  const [selectedPreset, setSelectedPreset] = useState(soundTherapyPresets.solfeggio[0].id);
  const [duration, setDuration] = useState(10);
  const [showSafety, setShowSafety] = useState(false);
  const { isPlaying, start, pause, stop } = useSoundTherapy();

  const presets = mode === 'solfeggio' ? soundTherapyPresets.solfeggio : soundTherapyPresets.neuroscience;
  const currentPreset = presets.find(p => p.id === selectedPreset) || presets[0];

  const handleStart = () => {
    if (!getSoundSafetyAcknowledged()) {
      setShowSafety(true);
      return;
    }
    start(currentPreset.frequency, duration);
  };

  const handleSafetyAcknowledge = () => {
    setSoundSafetyAcknowledged(true);
    setShowSafety(false);
    start(currentPreset.frequency, duration);
  };

  return (
    <div className="space-y-6">
      <AlertDialog open={showSafety} onOpenChange={setShowSafety}>
        <AlertDialogContent className="bg-parchment border-amber-900/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-amber-900">Safety Notice</AlertDialogTitle>
            <AlertDialogDescription className="text-amber-800 space-y-2">
              <p>
                <strong>Volume Warning:</strong> Please start at a low volume and adjust gradually. 
                Prolonged exposure to loud sounds can damage hearing.
              </p>
              <p>
                <strong>Medical Disclaimer:</strong> Sound therapy is for relaxation and wellness purposes only. 
                It is not a substitute for medical treatment. Discontinue use if you experience discomfort.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={handleSafetyAcknowledge}
              className="bg-amber-700 hover:bg-amber-800 text-white"
            >
              I Understand
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-amber-900">Mode</Label>
          <Select value={mode} onValueChange={(v: any) => {
            setMode(v);
            setSelectedPreset(v === 'solfeggio' ? soundTherapyPresets.solfeggio[0].id : soundTherapyPresets.neuroscience[0].id);
          }}>
            <SelectTrigger className="bg-white/50 border-amber-900/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-parchment border-amber-900/20">
              <SelectItem value="solfeggio">Solfeggio (Sacred)</SelectItem>
              <SelectItem value="neuroscience">Neuroscience (Binaural)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-amber-900">Frequency</Label>
          <Select value={selectedPreset} onValueChange={setSelectedPreset}>
            <SelectTrigger className="bg-white/50 border-amber-900/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-parchment border-amber-900/20">
              {presets.map(preset => (
                <SelectItem key={preset.id} value={preset.id}>
                  {preset.name} ({preset.frequency} Hz)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-amber-900">Duration: {duration} minutes</Label>
        <Slider
          value={[duration]}
          onValueChange={(v) => setDuration(v[0])}
          min={5}
          max={60}
          step={5}
          className="w-full"
        />
      </div>

      <div className="flex items-center gap-3">
        {!isPlaying ? (
          <Button
            onClick={handleStart}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Session
          </Button>
        ) : (
          <>
            <Button
              onClick={pause}
              variant="outline"
              className="border-amber-700 text-amber-700 hover:bg-amber-100/50"
            >
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
            <Button
              onClick={stop}
              variant="outline"
              className="border-red-700 text-red-700 hover:bg-red-100/50"
            >
              <Square className="w-4 h-4 mr-2" />
              Stop
            </Button>
          </>
        )}
        <div className="flex items-center gap-2 text-sm text-amber-800 ml-auto">
          <Volume2 className="w-4 h-4" />
          <span>{currentPreset.name}</span>
        </div>
      </div>
    </div>
  );
}
