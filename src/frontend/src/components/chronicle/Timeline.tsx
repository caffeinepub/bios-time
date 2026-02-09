import { Badge } from '@/components/ui/badge';
import { chronicleEntries } from '../../data/chronicleEntries';
import TtsControls from '../tts/TtsControls';

export default function Timeline() {
  return (
    <div className="space-y-8">
      {chronicleEntries.map((entry, index) => {
        const entryText = `${entry.period}. ${entry.title}. ${entry.description}`;
        
        return (
          <div key={index} className="relative pl-8 pb-8 border-l-2 border-amber-900/20 last:border-l-0 last:pb-0">
            <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-700 border-4 border-parchment" />
            <div className="space-y-2">
              <Badge variant="outline" className="border-amber-700 text-amber-700">
                {entry.period}
              </Badge>
              <h3 className="text-lg font-semibold text-amber-900">{entry.title}</h3>
              <p className="text-amber-800">{entry.description}</p>
              <TtsControls text={entryText} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
