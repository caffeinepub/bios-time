import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import PrimaryNav from '../nav/PrimaryNav';
import { useI18n } from '../../state/i18n/useI18n';
import ErrorBoundary from '../system/ErrorBoundary';

export default function AppShell() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex flex-col bg-parchment">
      <header className="sticky top-0 z-50 border-b border-amber-900/20 bg-parchment/95 backdrop-blur supports-[backdrop-filter]:bg-parchment/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate({ to: '/' })}
              className="text-2xl font-serif font-bold text-amber-900 hover:text-amber-700 transition-colors"
            >
              {t('dashboard.title')}
            </button>
            <PrimaryNav currentPath={currentPath} />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      <footer className="border-t border-amber-900/20 bg-parchment/95 backdrop-blur mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-amber-900/70">
            <p className="flex items-center gap-1">
              © 2026. Built with <Heart className="w-4 h-4 text-amber-700 fill-amber-700" /> using{' '}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 hover:text-amber-900 underline"
              >
                caffeine.ai
              </a>
            </p>
            <button
              onClick={() => navigate({ to: '/ethics' })}
              className="text-amber-700 hover:text-amber-900 underline"
            >
              {t('footer.ethics')}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
