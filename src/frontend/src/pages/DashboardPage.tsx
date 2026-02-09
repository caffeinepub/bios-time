import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Orbit } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import MemoryAnchorCard from '../components/dashboard/MemoryAnchorCard';
import SoundTherapyModule from '../components/sound/SoundTherapyModule';
import NonBlockingErrorAlert from '../components/system/NonBlockingErrorAlert';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { getHoloceneYear, formatHoloceneDate } from '../utils/dates/holocene';
import { getDateDisplayPreference } from '../state/preferences/dateDisplay';
import LoginButton from '../components/auth/LoginButton';
import { useI18n } from '../state/i18n/useI18n';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { identity, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity && loginStatus !== 'initializing';
  const { data: userProfile, isLoading: profileLoading, isFetched, error: profileError } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();
  const [name, setName] = useState('');
  const [viewedDate, setViewedDate] = useState(new Date());
  const [datePreference, setDatePreference] = useState<'he-primary' | 'gregorian-primary'>('he-primary');
  const { t } = useI18n();

  // Load date preference safely
  useEffect(() => {
    try {
      const pref = getDateDisplayPreference();
      setDatePreference(pref);
    } catch (error) {
      console.error('Failed to load date preference:', error);
    }
  }, []);

  // Only show profile setup when:
  // - User is authenticated (not initializing)
  // - Profile is not loading
  // - Profile fetch is complete
  // - Profile is explicitly null (not just undefined)
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleSaveProfile = () => {
    if (name.trim()) {
      saveProfile.mutate({ name: name.trim() });
    }
  };

  const handleStartRitual = () => {
    navigate({ to: '/bios-time-ritual' });
  };

  const today = new Date();
  const holoceneYear = getHoloceneYear(today);
  const formattedDate = formatHoloceneDate(today, datePreference);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Error Alerts - Only show for actual errors, not for guest/unauthorized */}
      {profileError && isAuthenticated && (
        <NonBlockingErrorAlert
          title="Profile Error"
          message="Failed to load your profile. Some features may be unavailable."
        />
      )}
      {saveProfile.isError && (
        <NonBlockingErrorAlert
          title="Save Error"
          message="Failed to save your profile. Please try again."
        />
      )}

      {/* Profile Setup Dialog */}
      <Dialog open={showProfileSetup} onOpenChange={() => {}}>
        <DialogContent className="bg-parchment border-amber-900/20">
          <DialogHeader>
            <DialogTitle className="text-amber-900">{t('dashboard.welcomeGuest')}</DialogTitle>
            <DialogDescription className="text-amber-800">
              Please tell us your name to personalize your experience.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-amber-900">Your Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="bg-white/50 border-amber-900/20"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSaveProfile}
              disabled={!name.trim() || saveProfile.isPending}
              className="bg-amber-700 hover:bg-amber-800 text-white"
            >
              {saveProfile.isPending ? 'Saving...' : 'Continue'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900">
          {isAuthenticated && userProfile ? `${t('dashboard.welcomeUser')}, ${userProfile.name}` : t('dashboard.welcomeGuest')}
        </h1>
        <div className="space-y-2">
          <p className="text-2xl md:text-3xl font-serif text-amber-800">
            {formattedDate}
          </p>
          <Badge variant="outline" className="text-sm border-amber-700 text-amber-700">
            Year {holoceneYear} of the Holocene Era
          </Badge>
        </div>
        {!isAuthenticated && loginStatus !== 'initializing' && (
          <div className="pt-4">
            <LoginButton />
          </div>
        )}
      </div>

      <Separator className="bg-amber-900/20" />

      {/* BIOS-TIME Ritual Entry */}
      <Card className="bg-gradient-to-br from-indigo-900/20 to-amber-900/20 border-amber-900/30 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-amber-900 flex items-center gap-2">
            <Orbit className="w-6 h-6" />
            {t('ritual.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-amber-800">
            {t('ritual.description')}
          </p>
          <Button
            onClick={handleStartRitual}
            className="bg-amber-700 hover:bg-amber-800 text-white"
          >
            <Orbit className="w-5 h-5 mr-2" />
            {t('ritual.start')}
          </Button>
        </CardContent>
      </Card>

      {/* Memory Anchor */}
      <MemoryAnchorCard viewedDate={viewedDate} onDateChange={setViewedDate} />

      {/* Sound Therapy Module */}
      <Card className="bg-white/40 border-amber-900/20 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-amber-900 flex items-center gap-2">
            <span className="text-2xl">🎵</span>
            Sound Therapy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SoundTherapyModule />
        </CardContent>
      </Card>

      {/* Bio-Sentinel Placeholder */}
      {isAuthenticated && (
        <Card className="bg-white/40 border-amber-900/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-amber-900 flex items-center gap-2">
              <span className="text-2xl">🧬</span>
              Bio-Sentinel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-amber-800 text-sm">
              Monitor your vital rhythms and receive personalized guidance. Configure your inputs in Settings.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
