import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

interface DreamEditorProps {
  dream: any;
  isOpen: boolean;
  onClose: () => void;
  onOpenCreate: () => void;
}

export default function DreamEditor({ dream, isOpen, onClose, onOpenCreate }: DreamEditorProps) {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [mood, setMood] = useState('');

  useEffect(() => {
    if (dream) {
      setContent(dream.content || '');
      setTags(dream.tags?.join(', ') || '');
      setMood(dream.mood || '');
    } else {
      setContent('');
      setTags('');
      setMood('');
    }
  }, [dream]);

  const handleSave = () => {
    // Save to local storage for now
    const dreamEntry = {
      date: Date.now(),
      content,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      mood: mood || undefined,
    };
    
    const existing = JSON.parse(localStorage.getItem('bios-time-dreams') || '[]');
    existing.push(dreamEntry);
    localStorage.setItem('bios-time-dreams', JSON.stringify(existing));
    
    onClose();
  };

  return (
    <>
      <div className="mb-4">
        <Button
          onClick={onOpenCreate}
          className="bg-amber-700 hover:bg-amber-800 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Dream Entry
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-parchment border-amber-900/20 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-amber-900">
              {dream ? 'Edit Dream' : 'New Dream Entry'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="content" className="text-amber-900">Dream Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Describe your dream..."
                rows={6}
                className="bg-white/50 border-amber-900/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-amber-900">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="flying, water, symbols"
                className="bg-white/50 border-amber-900/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mood" className="text-amber-900">Mood (optional)</Label>
              <Input
                id="mood"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="peaceful, anxious, joyful"
                className="bg-white/50 border-amber-900/20"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={onClose}
              className="border-amber-700 text-amber-700 hover:bg-amber-100/50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-amber-700 hover:bg-amber-800 text-white"
            >
              Save Dream
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
