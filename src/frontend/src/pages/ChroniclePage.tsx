import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import Timeline from '../components/chronicle/Timeline';
import { useI18n } from '../state/i18n/useI18n';

export default function ChroniclePage() {
  const { t } = useI18n();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900">{t('chronicle.title')}</h1>
        <p className="text-lg text-amber-800">{t('chronicle.subtitle')}</p>
      </div>

      <Alert className="bg-amber-100/50 border-amber-700/30">
        <Info className="h-4 w-4 text-amber-700" />
        <AlertDescription className="text-amber-900">
          {t('chronicle.disclaimer')}
        </AlertDescription>
      </Alert>

      <Card className="bg-white/40 border-amber-900/20 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-amber-900">{t('chronicle.title')}</CardTitle>
          <CardDescription className="text-amber-800">
            From the dawn of agriculture to the digital age
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Timeline />
        </CardContent>
      </Card>
    </div>
  );
}
