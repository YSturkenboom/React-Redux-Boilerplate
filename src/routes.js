import App from './app';
import { Articles, Home, Logout, NotFound } from './pages';

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
