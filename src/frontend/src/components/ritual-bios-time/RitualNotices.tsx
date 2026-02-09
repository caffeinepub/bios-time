import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface Notice {
  type: 'audio' | 'orientation' | 'vibration';
  message: string;
}

interface RitualNoticesProps {
  notices: Notice[];
}

export default function RitualNotices({ notices }: RitualNoticesProps) {
  if (notices.length === 0) return null;

  return (
    <div className="absolute top-20 left-4 right-4 z-40 space-y-2">
      {notices.map((notice, index) => (
        <Alert key={index} className="ritual-glass-panel border-white/20">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-sm">
            {notice.message}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
