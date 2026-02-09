import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Square, Sun, Moon } from 'lucide-react';
import { useVortexTimer } from '../../hooks/useVortexTimer';
import { getNextReleaseMoment } from '../../utils/time/releaseMoments';

export default function VortexModule() {
  const [cycleLength, setCycleLength] = useState<90 | 100 | 110 | 120>(90);
  const { isActive, phase, timeRemaining, start, stop } = useVortexTimer(cycleLength);

  const nextZenith = getNextReleaseMoment('zenith');
  const nextNadir = getNextReleaseMoment('nadir');

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-amber-900">Ultradian Cycle Length</Label>
        <Select
          value={cycleLength.toString()}
          onValueChange={(v) => setCycleLength(parseInt(v) as any)}
          disabled={isActive}
        >
          <SelectTrigger className="bg-white/50 border-amber-900/20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-parchment border-amber-900/20">
            <SelectItem value="90">90 minutes</SelectItem>
            <SelectItem value="100">100 minutes</SelectItem>
            <SelectItem value="110">110 minutes</SelectItem>
            <SelectItem value="120">120 minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isActive && (
        <Card className="bg-amber-50/50 border-amber-900/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Badge
                variant={phase === 'focus' ? 'default' : 'outline'}
                className={phase === 'focus' ? 'bg-amber-700 text-white' : 'border-green-700 text-green-700'}
              >
                {phase === 'focus' ? 'Focus Phase' : 'Release Phase'}
              </Badge>
              <div className="text-4xl font-bold text-amber-900">
                {formatTime(timeRemaining)}
              </div>
              <p className="text-sm text-amber-800">
                {phase === 'focus' ? 'Deep work in progress' : 'Time to rest and integrate'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center gap-3">
        {!isActive ? (
          <Button
            onClick={start}
            className="bg-amber-700 hover:bg-amber-800 text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Focus Session
          </Button>
        ) : (
          <Button
            onClick={stop}
            variant="outline"
            className="border-red-700 text-red-700 hover:bg-red-100/50"
          >
            <Square className="w-4 h-4 mr-2" />
            End Session
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <Card className="bg-amber-50/30 border-amber-900/20">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Sun className="w-8 h-8 text-amber-600" />
              <div>
                <p className="text-xs text-amber-800">Next Zenith (Midday)</p>
                <p className="font-semibold text-amber-900">{nextZenith.toLocaleTimeString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-indigo-50/30 border-indigo-900/20">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Moon className="w-8 h-8 text-indigo-600" />
              <div>
                <p className="text-xs text-indigo-800">Next Nadir (Midnight)</p>
                <p className="font-semibold text-indigo-900">{nextNadir.toLocaleTimeString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
