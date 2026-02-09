import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import AppShell from './components/layout/AppShell';
import DashboardPage from './pages/DashboardPage';
import TrueTimePage from './pages/TrueTimePage';
import ChroniclePage from './pages/ChroniclePage';
import RitualsPage from './pages/RitualsPage';
import DreamJournalPage from './pages/DreamJournalPage';
import SettingsPage from './pages/SettingsPage';
import EthicsDisclaimersPage from './pages/EthicsDisclaimersPage';
import BiosTimeRitualPage from './pages/BiosTimeRitualPage';
import { I18nProvider } from './state/i18n/I18nProvider';
import { TtsProvider } from './state/tts/TtsProvider';
import RouteErrorComponent from './components/system/RouteErrorComponent';

const rootRoute = createRootRoute({
  component: AppShell,
  errorComponent: RouteErrorComponent,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
  errorComponent: RouteErrorComponent,
});

const trueTimeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/true-time',
  component: TrueTimePage,
  errorComponent: RouteErrorComponent,
});

const chronicleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chronicle',
  component: ChroniclePage,
  errorComponent: RouteErrorComponent,
});

const ritualsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/rituals',
  component: RitualsPage,
  errorComponent: RouteErrorComponent,
});

const dreamJournalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dreams',
  component: DreamJournalPage,
  errorComponent: RouteErrorComponent,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsPage,
  errorComponent: RouteErrorComponent,
});

const ethicsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ethics',
  component: EthicsDisclaimersPage,
  errorComponent: RouteErrorComponent,
});

const biosTimeRitualRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bios-time-ritual',
  component: BiosTimeRitualPage,
  errorComponent: RouteErrorComponent,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  trueTimeRoute,
  chronicleRoute,
  ritualsRoute,
  dreamJournalRoute,
  settingsRoute,
  ethicsRoute,
  biosTimeRitualRoute,
]);

const router = createRouter({ 
  routeTree,
  defaultErrorComponent: RouteErrorComponent,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <I18nProvider>
      <TtsProvider>
        <RouterProvider router={router} />
      </TtsProvider>
    </I18nProvider>
  );
}
