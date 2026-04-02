import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { PreviousIncidents } from './pages/PreviousIncidents';
import { NewEvents } from './pages/NewEvents';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'dashboard', Component: Dashboard },
      { path: 'incidents', Component: PreviousIncidents },
      { path: 'events', Component: NewEvents },
    ],
  },
]);
