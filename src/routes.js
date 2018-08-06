import App from 'app';
import { Home, Logout, NotFound } from 'pages';

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
