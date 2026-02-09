import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getMemoryAnchor } from '../../data/memoryAnchors';
import { formatHoloceneDate } from '../../utils/dates/holocene';
import { getDateDisplayPreference } from '../../state/preferences/dateDisplay';
import TtsControls from '../tts/TtsControls';

interface MemoryAnchorCardProps {
  viewedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function MemoryAnchorCard({ viewedDate, onDateChange }: MemoryAnchorCardProps) {
  const anchor = getMemoryAnchor(viewedDate);
  const datePreference = getDateDisplayPreference();

  const handlePrevious = () => {
    const newDate = new Date(viewedDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(viewedDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };

  const contentText = `${anchor.title}. ${anchor.text}`;

  return (
    <Card className="bg-white/40 border-amber-900/20 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-amber-900 flex items-center justify-between">
          <span>Memory Anchor</span>
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
              {formatHoloceneDate(viewedDate, datePreference)}
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
      <CardContent className="space-y-3">
        <h3 className="font-semibold text-lg text-amber-900">{anchor.title}</h3>
        <p className="text-amber-800">{anchor.text}</p>
        <TtsControls text={contentText} />
      </CardContent>
    </Card>
  );
}
