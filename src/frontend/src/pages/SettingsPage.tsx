import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from '@tanstack/react-router';
import { getDateDisplayPreference, setDateDisplayPreference } from '../state/preferences/dateDisplay';
import { getPrivacySettings, setPrivacySettings } from '../state/preferences/privacySettings';
import { exportJardinSecretData } from '../utils/export/exportJson';
import { useState } from 'react';
import { ethicsPrinciples } from '../content/ethicsPrinciples';
import { Download } from 'lucide-react';
import { useI18n } from '../state/i18n/useI18n';
import { useTtsContext } from '../state/tts/TtsProvider';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [datePreference, setDatePref] = useState(getDateDisplayPreference());
  const [privacySettings, setPrivacyState] = useState(getPrivacySettings());
  const { t, language, setLanguage } = useI18n();
  const { enabled: ttsEnabled, setEnabled: setTtsEnabled, supported: ttsSupported } = useTtsContext();

  const handleDatePreferenceChange = (heFirst: boolean) => {
    const newPref = heFirst ? 'he-primary' : 'gregorian-primary';
    setDateDisplayPreference(newPref);
    setDatePref(newPref);
  };

  const handleSyncToggle = (enabled: boolean) => {
    const newSettings = { ...privacySettings, syncEnabled: enabled };
    setPrivacySettings(newSettings);
    setPrivacyState(newSettings);
  };

  const handleExport = () => {
    exportJardinSecretData();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900">{t('settings.title')}</h1>
        <p className="text-lg text-amber-800">{t('settings.subtitle')}</p>
      </div>

      {/* Language Selection */}
      <Card className="bg-white/40 border-amber-900/20 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-amber-900">{t('settings.language')}</CardTitle>
          <CardDescription className="text-amber-800">
            {t('settings.languageDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="language-select" className="text-amber-900">
              Interface Language
            </Label>
            <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'fr')}>
              <SelectTrigger id="language-select" className="w-[180px] bg-white/50 border-amber-900/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-parchment border-amber-900/20">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Text-to-Speech */}
      <Card className="bg-white/40 border-amber-900/20 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-amber-900">{t('settings.tts')}</CardTitle>
          <CardDescription className="text-amber-800">
            {t('settings.ttsDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="tts-toggle" className="text-amber-900">
                Enable Text-to-Speech
              </Label>
              <p className="text-sm text-amber-800">
                {ttsEnabled
                  ? 'Audio playback controls are available on reading content'
                  : 'Enable to listen to content instead of reading'}
              </p>
              {!ttsSupported && (
                <p className="text-sm text-amber-700 italic">
                  Text-to-speech is not supported in your browser.
                </p>
              )}
            </div>
            <Switch
              id="tts-toggle"
              checked={ttsEnabled}
              onCheckedChange={setTtsEnabled}
              disabled={!ttsSupported}
            />
          </div>
        </CardContent>
      </Card>

      {/* Date Display */}
      <Card className="bg-white/40 border-amber-900/20 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-amber-900">{t('settings.dateDisplay')}</CardTitle>
          <CardDescription className="text-amber-800">
            {t('settings.dateDisplayDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="date-format" className="text-amber-900">
              Show Holocene Era (HE) as primary format
            </Label>
            <Switch
              id="date-format"
              checked={datePreference === 'he-primary'}
              onCheckedChange={handleDatePreferenceChange}
            />
          </div>
          <p className="text-sm text-amber-800">
            {datePreference === 'he-primary'
              ? 'Dates will show HE year first (e.g., 12025 HE / 2025 CE)'
              : 'Dates will show Gregorian year first (e.g., 2025 CE / 12025 HE)'}
          </p>
        </CardContent>
      </Card>

      {/* Privacy & Data */}
      <Card className="bg-white/40 border-amber-900/20 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-amber-900">{t('settings.privacy')}</CardTitle>
          <CardDescription className="text-amber-800">
            {t('settings.privacyDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="sync-toggle" className="text-amber-900">
                  Sync data to canister
                </Label>
                <p className="text-sm text-amber-800">
                  {privacySettings.syncEnabled
                    ? 'Your data is synced to the Internet Computer'
                    : 'Your data stays local on this device only (default)'}
                </p>
              </div>
              <Switch
                id="sync-toggle"
                checked={privacySettings.syncEnabled}
                onCheckedChange={handleSyncToggle}
              />
            </div>
            <Separator className="bg-amber-900/20" />
            <div className="space-y-2">
              <Label className="text-amber-900">Export Your Data</Label>
              <p className="text-sm text-amber-800">
                Download all your dreams and rituals as a JSON file
              </p>
              <Button
                onClick={handleExport}
                variant="outline"
                className="border-amber-700 text-amber-700 hover:bg-amber-100/50"
              >
                <Download className="w-4 h-4 mr-2" />
                Export to JSON
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ethics Principles */}
      <Card className="bg-white/40 border-amber-900/20 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-amber-900">{t('settings.ethics')}</CardTitle>
          <CardDescription className="text-amber-800">
            {t('settings.ethicsDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {ethicsPrinciples.map((principle, index) => (
            <div key={index} className="space-y-1">
              <h3 className="font-semibold text-amber-900">{principle.title}</h3>
              <p className="text-sm text-amber-800">{principle.description}</p>
            </div>
          ))}
          <Separator className="bg-amber-900/20 my-4" />
          <Button
            onClick={() => navigate({ to: '/ethics' })}
            variant="outline"
            className="border-amber-700 text-amber-700 hover:bg-amber-100/50"
          >
            Read Full Ethics & Disclaimers
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
