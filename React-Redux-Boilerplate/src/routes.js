import App from './app';
import { Home } from './pages';

const publicRoutes = [
  {
    path: '/',
    exact: true,
    component: Home
  }
];

const privateRoutes = [
  {
    path: '/',
    exact: true,
    component: Home
  }
];

export default [
  {
    component: App,
    routes: [
      ...publicRoutes,
      ...privateRoutes.map(route => ({
        ...route,
        component: route.component
      }))
    ]
  }
];
