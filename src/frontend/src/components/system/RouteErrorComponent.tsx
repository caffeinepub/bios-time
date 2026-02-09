import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface RouteErrorComponentProps {
  error?: Error;
}

export default function RouteErrorComponent({ error }: RouteErrorComponentProps) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/40 border border-amber-900/20 backdrop-blur rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-8 h-8 text-red-600" />
          <h2 className="text-xl font-serif font-bold text-amber-900">Something went wrong</h2>
        </div>
        <p className="text-amber-800">
          An unexpected error occurred while loading this page.
        </p>
        {error && (
          <p className="text-sm text-amber-700 font-mono">
            {error.message || 'Unknown error'}
          </p>
        )}
        <Button
          onClick={() => window.location.reload()}
          className="w-full bg-amber-700 hover:bg-amber-800 text-white"
        >
          Reload Page
        </Button>
      </div>
    </div>
  );
}
