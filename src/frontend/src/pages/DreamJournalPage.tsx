import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DreamList from '../components/dreams/DreamList';
import DreamEditor from '../components/dreams/DreamEditor';
import { useState } from 'react';

export default function DreamJournalPage() {
  const [editingDream, setEditingDream] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900">Dream Journal</h1>
        <p className="text-lg text-amber-800">Record your nocturnal voyages through the cosmos</p>
      </div>

      <Card className="bg-white/40 border-amber-900/20 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-amber-900">Your Dreams</CardTitle>
        </CardHeader>
        <CardContent>
          <DreamEditor
            dream={editingDream}
            isOpen={isCreating || !!editingDream}
            onClose={() => {
              setIsCreating(false);
              setEditingDream(null);
            }}
            onOpenCreate={() => setIsCreating(true)}
          />
          <DreamList onEdit={setEditingDream} />
        </CardContent>
      </Card>
    </div>
  );
}
