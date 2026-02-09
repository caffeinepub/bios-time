import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Shield, Info } from 'lucide-react';
import { ethicsPrinciples } from '../content/ethicsPrinciples';
import { useI18n } from '../state/i18n/useI18n';
import TtsControls from '../components/tts/TtsControls';

export default function EthicsDisclaimersPage() {
  const { t } = useI18n();

  const medicalDisclaimerText = `BIOS-TIME is not a medical device and does not provide medical advice, diagnosis, or treatment. The sound therapy, bio-sentinel, and other features are for contemplative and educational purposes only. Always consult qualified healthcare professionals for medical concerns. Do not use this application as a substitute for professional medical advice or treatment.`;

  const privacyNoticeText = `By default, all your personal data (dreams, rituals, bio-inputs) is stored locally on your device only. You can optionally enable sync to store encrypted data on the Internet Computer blockchain. We do not sell or share your personal information with third parties. You maintain full control and ownership of your data.`;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900">{t('ethics.title')}</h1>
        <p className="text-lg text-amber-800">{t('ethics.subtitle')}</p>
      </div>

      {/* Medical Disclaimer */}
      <Alert className="bg-red-50 border-red-300">
        <AlertTriangle className="h-5 w-5 text-red-600" />
        <AlertTitle className="text-red-900 font-bold">Medical Disclaimer</AlertTitle>
        <AlertDescription className="text-red-800 space-y-2">
          <p>{medicalDisclaimerText}</p>
          <TtsControls text={medicalDisclaimerText} className="mt-2" />
        </AlertDescription>
      </Alert>

      {/* Privacy Notice */}
      <Card className="bg-white/40 border-amber-900/20 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-amber-900 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy Notice
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-amber-800">{privacyNoticeText}</p>
          <TtsControls text={privacyNoticeText} />
        </CardContent>
      </Card>

      {/* Content Disclaimer */}
      <Card className="bg-white/40 border-amber-900/20 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-amber-900 flex items-center gap-2">
            <Info className="w-5 h-5" />
            Content Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-amber-800">
            The Holocene Chronicle and Memory Anchors present interpretive historical content for contemplative 
            purposes. While based on historical events, the narratives are simplified and may not reflect the 
            full complexity of historical scholarship. This content is intended to inspire reflection on humanity's 
            long journey, not as a comprehensive historical reference.
          </p>
        </CardContent>
      </Card>

      {/* Ethical Principles */}
      <Card className="bg-white/40 border-amber-900/20 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-amber-900">Our Ethical Principles</CardTitle>
          <CardDescription className="text-amber-800">
            The values that guide the development and use of BIOS-TIME
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {ethicsPrinciples.map((principle, index) => (
            <div key={index} className="space-y-1">
              <h3 className="font-semibold text-amber-900">{principle.title}</h3>
              <p className="text-sm text-amber-800">{principle.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
