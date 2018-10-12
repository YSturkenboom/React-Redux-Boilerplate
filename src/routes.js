import React from 'react';
import { Redirect } from 'react-router-dom';

import { authActions } from './actions';
import withAuth from './utils/withAuth';
import App from './app';
import {
  Home,
  Login,
  Logout,
  NotFound,
  Lists,
  Register,
  ForgotPassword,
  ResetPassword
} from './pages';

const publicRoutes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/lists" />
  },
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/register',
    exact: true,
    component: Register
  },
  {
    path: '/forgot-password',
    exact: true,
    component: ForgotPassword
  },
  {
    path: '/set-password/:token',
    component: ResetPassword
  }
];

const privateRoutes = [
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
