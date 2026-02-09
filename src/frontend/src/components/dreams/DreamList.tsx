import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Moon } from 'lucide-react';

interface DreamListProps {
  onEdit: (dream: any) => void;
}

export default function DreamList({ onEdit }: DreamListProps) {
  const [dreams, setDreams] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bios-time-dreams') || '[]');
    setDreams(stored.reverse());
  }, []);

  if (dreams.length === 0) {
    return (
      <div className="text-center py-12 text-amber-800">
        <Moon className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No dreams recorded yet. Start your nocturnal journal above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {dreams.map((dream, index) => (
        <Card
          key={index}
          className="bg-white/40 border-amber-900/20 backdrop-blur cursor-pointer hover:bg-white/60 transition-colors"
          onClick={() => onEdit(dream)}
        >
          <CardContent className="pt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-amber-800">
                  {new Date(dream.date).toLocaleDateString()}
                </span>
                {dream.mood && (
                  <Badge variant="outline" className="border-indigo-700 text-indigo-700">
                    {dream.mood}
                  </Badge>
                )}
              </div>
              <p className="text-amber-900 line-clamp-3">{dream.content}</p>
              {dream.tags && dream.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {dream.tags.map((tag: string, i: number) => (
                    <Badge key={i} variant="outline" className="border-amber-700 text-amber-700 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
