import App from './app';
import { Articles, Home, Logout, NotFound, Overview, Reports } from './pages';

export default [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/articles',
        exact: true,
        component: Articles
      },
      {
        path: '/overview',
        exact: true,
        component: Overview
      },
      {
        path: '/reports',
        exact: true,
        component: Reports
      },
      {
        path: '/logout',
        exact: true,
        component: Logout
      },
      {
        component: NotFound
      }
    ]
  }
];
