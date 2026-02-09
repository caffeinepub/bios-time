import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus } from 'lucide-react';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function RitualEditor() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [timeOfDay, setTimeOfDay] = useState('');

  const handleDayToggle = (day: number) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSave = () => {
    const ritual = {
      title,
      description,
      schedule: selectedDays,
      timeOfDay: timeOfDay || undefined,
      completed: false,
    };

    const existing = JSON.parse(localStorage.getItem('bios-time-rituals') || '[]');
    existing.push(ritual);
    localStorage.setItem('bios-time-rituals', JSON.stringify(existing));

    setTitle('');
    setDescription('');
    setSelectedDays([]);
    setTimeOfDay('');
  };

  return (
    <Card className="bg-white/40 border-amber-900/20 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-amber-900">Create Personal Ritual</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ritual-title" className="text-amber-900">Title</Label>
          <Input
            id="ritual-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Morning meditation"
            className="bg-white/50 border-amber-900/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ritual-description" className="text-amber-900">Description</Label>
          <Textarea
            id="ritual-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="10 minutes of mindful breathing at sunrise"
            rows={3}
            className="bg-white/50 border-amber-900/20"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-amber-900">Days of Week</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`day-${index}`}
                  checked={selectedDays.includes(index)}
                  onCheckedChange={() => handleDayToggle(index)}
                />
                <Label htmlFor={`day-${index}`} className="text-sm text-amber-900 cursor-pointer">
                  {day}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ritual-time" className="text-amber-900">Time of Day (optional)</Label>
          <Input
            id="ritual-time"
            type="time"
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value)}
            className="bg-white/50 border-amber-900/20"
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={!title || selectedDays.length === 0}
          className="bg-amber-700 hover:bg-amber-800 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Ritual
        </Button>
      </CardContent>
    </Card>
  );
}
