import App from './app';
import { Home, Logout, NotFound, Lists } from './pages';

export default [
  {
    component: App,
    routes: [
      {
        path: '/list/:id',
        exact: true,
        component: Home
      },
      {
        path: '/lists',
        exact: true,
        component: Lists
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
