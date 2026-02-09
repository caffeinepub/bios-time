import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface NonBlockingErrorAlertProps {
  title?: string;
  message: string;
  onDismiss?: () => void;
}

export default function NonBlockingErrorAlert({
  title = 'Error',
  message,
  onDismiss,
}: NonBlockingErrorAlertProps) {
  const [dismissed, setDismissed] = useState(false);

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  if (dismissed) return null;

  return (
    <Alert variant="destructive" className="relative bg-red-50 border-red-300">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6"
        onClick={handleDismiss}
      >
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  );
}
