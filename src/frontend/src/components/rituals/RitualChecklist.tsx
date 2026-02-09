import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

export default function RitualChecklist() {
  const [rituals, setRituals] = useState<any[]>([]);
  const [completions, setCompletions] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bios-time-rituals') || '[]');
    setRituals(stored);

    const storedCompletions = JSON.parse(localStorage.getItem('bios-time-ritual-completions') || '{}');
    setCompletions(storedCompletions);
  }, []);

  const handleToggleCompletion = (index: number) => {
    const today = new Date().toISOString().split('T')[0];
    const ritualKey = `ritual-${index}`;
    const currentCompletions = completions[ritualKey] || [];

    let newCompletions;
    if (currentCompletions.includes(today)) {
      newCompletions = currentCompletions.filter(d => d !== today);
    } else {
      newCompletions = [...currentCompletions, today];
    }

    const updated = { ...completions, [ritualKey]: newCompletions };
    setCompletions(updated);
    localStorage.setItem('bios-time-ritual-completions', JSON.stringify(updated));
  };

  const getCompletionCount = (index: number) => {
    const ritualKey = `ritual-${index}`;
    const currentCompletions = completions[ritualKey] || [];
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return currentCompletions.filter(date => new Date(date) >= sevenDaysAgo).length;
  };

  const isCompletedToday = (index: number) => {
    const today = new Date().toISOString().split('T')[0];
    const ritualKey = `ritual-${index}`;
    return (completions[ritualKey] || []).includes(today);
  };

  if (rituals.length === 0) {
    return (
      <Card className="bg-white/40 border-amber-900/20 backdrop-blur">
        <CardContent className="pt-6">
          <div className="text-center py-12 text-amber-800">
            <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No rituals created yet. Design your first ritual above.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/40 border-amber-900/20 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-amber-900">Today's Rituals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rituals.map((ritual, index) => {
          const completionCount = getCompletionCount(index);
          const completed = isCompletedToday(index);

          return (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg bg-white/40 border border-amber-900/20"
            >
              <Checkbox
                checked={completed}
                onCheckedChange={() => handleToggleCompletion(index)}
                className="mt-1"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-amber-900">{ritual.title}</h3>
                  <Badge variant="outline" className="border-green-700 text-green-700">
                    {completionCount}/7 days
                  </Badge>
                </div>
                <p className="text-sm text-amber-800">{ritual.description}</p>
                {ritual.timeOfDay && (
                  <p className="text-xs text-amber-700">Scheduled: {ritual.timeOfDay}</p>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
