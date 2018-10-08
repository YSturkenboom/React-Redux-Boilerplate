import { authActions } from './actions';
import withAuth from './utils/withAuth';
import App from './app';
import { Home, Login, Logout, NotFound, Lists, Register } from './pages';

const publicRoutes = [
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/register',
    exact: true,
    component: Register
  }
];

const privateRoutes = [
  {
    path: '/list/:id',
    exact: true,
    component: Home
  },
  {
    path: '/',
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
];

export default [
  {
    component: App,
    routes: [
      ...publicRoutes,
      ...privateRoutes.map(route => ({
        ...route,
        component: withAuth(route.component),
        loadData: () => [authActions.checkSession()]
      }))
    ]
  }
];
