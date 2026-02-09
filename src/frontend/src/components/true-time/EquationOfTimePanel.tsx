import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { calculateEquationOfTime } from '../../utils/astronomy/equationOfTime';
import { formatHoloceneDate } from '../../utils/dates/holocene';
import { getDateDisplayPreference } from '../../state/preferences/dateDisplay';
import TtsControls from '../tts/TtsControls';

interface EquationOfTimePanelProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function EquationOfTimePanel({ selectedDate, onDateChange }: EquationOfTimePanelProps) {
  const eot = calculateEquationOfTime(selectedDate);
  const datePreference = getDateDisplayPreference();

  const handlePrevious = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };

  const explanationText = `What is the Equation of Time? It measures the difference between apparent solar time (sundial time) and mean solar time (clock time). This variation occurs because Earth's orbit is elliptical and its axis is tilted. The Analemma: If you photographed the sun at the same clock time every day for a year, it would trace a figure-8 pattern in the sky called an analemma. This beautiful curve is a visual representation of the Equation of Time combined with the sun's changing declination throughout the seasons. The Equation of Time varies from about -16 minutes in early November to +14 minutes in mid-February, creating the distinctive analemma shape that has fascinated astronomers and timekeepers for millennia.`;

  return (
    <Card className="bg-white/40 border-amber-900/20 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-amber-900 flex items-center justify-between">
          <span>Equation of Time</span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="h-8 w-8 text-amber-700 hover:text-amber-900 hover:bg-amber-100/50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-normal text-amber-800">
              {formatHoloceneDate(selectedDate, datePreference)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="h-8 w-8 text-amber-700 hover:text-amber-900 hover:bg-amber-100/50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-5xl font-bold text-amber-900">
            {eot > 0 ? '+' : ''}{eot.toFixed(1)} min
          </div>
          <p className="text-sm text-amber-800">
            {eot > 0 ? 'Solar noon is later than clock noon' : 'Solar noon is earlier than clock noon'}
          </p>
        </div>

        <div className="space-y-4 text-amber-800">
          <p>
            <strong className="text-amber-900">What is the Equation of Time?</strong> It measures the difference 
            between apparent solar time (sundial time) and mean solar time (clock time). This variation occurs 
            because Earth's orbit is elliptical and its axis is tilted.
          </p>
          <p>
            <strong className="text-amber-900">The Analemma:</strong> If you photographed the sun at the same 
            clock time every day for a year, it would trace a figure-8 pattern in the sky called an analemma. 
            This beautiful curve is a visual representation of the Equation of Time combined with the sun's 
            changing declination throughout the seasons.
          </p>
          <p>
            The Equation of Time varies from about -16 minutes in early November to +14 minutes in mid-February, 
            creating the distinctive analemma shape that has fascinated astronomers and timekeepers for millennia.
          </p>
          <TtsControls text={explanationText} />
        </div>
      </CardContent>
    </Card>
  );
}
