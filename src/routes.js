import App from './app';
import { Articles, Home, Logout, NotFound, Overview } from './pages';

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
