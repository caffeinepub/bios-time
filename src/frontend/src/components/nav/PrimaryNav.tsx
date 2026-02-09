import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sun, Clock, BookOpen, Sparkles, Moon, Settings, Shield, Orbit } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '../../state/i18n/useI18n';

interface PrimaryNavProps {
  currentPath: string;
}

export default function PrimaryNav({ currentPath }: PrimaryNavProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  const navItems = [
    { path: '/', label: t('nav.dashboard'), icon: Sun },
    { path: '/bios-time-ritual', label: t('nav.biosTimeRitual'), icon: Orbit },
    { path: '/true-time', label: t('nav.trueTime'), icon: Clock },
    { path: '/chronicle', label: t('nav.chronicle'), icon: BookOpen },
    { path: '/rituals', label: t('nav.rituals'), icon: Sparkles },
    { path: '/dreams', label: t('nav.dreams'), icon: Moon },
    { path: '/ethics', label: t('nav.ethics'), icon: Shield },
    { path: '/settings', label: t('nav.settings'), icon: Settings },
  ];

  const handleNavigate = (path: string) => {
    navigate({ to: path });
    setOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          return (
            <Button
              key={item.path}
              variant={isActive ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleNavigate(item.path)}
              className={isActive ? 'bg-amber-700 hover:bg-amber-800 text-white' : 'text-amber-900 hover:text-amber-700 hover:bg-amber-100/50'}
            >
              <Icon className="w-4 h-4 mr-2" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      {/* Mobile Navigation */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="text-amber-900">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-parchment border-amber-900/20">
          <nav className="flex flex-col gap-2 mt-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? 'default' : 'ghost'}
                  onClick={() => handleNavigate(item.path)}
                  className={`justify-start ${isActive ? 'bg-amber-700 hover:bg-amber-800 text-white' : 'text-amber-900 hover:text-amber-700 hover:bg-amber-100/50'}`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
