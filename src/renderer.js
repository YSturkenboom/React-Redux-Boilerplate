/* eslint-disable */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { getLoadableState } from 'loadable-components/server';
import Helmet from 'react-helmet';
import createHistory from 'history/createMemoryHistory';
import chalk from 'chalk';

import configureStore from 'utils/configureStore';
import renderHtml from 'utils/renderHtml';

import routes from './routes';
import assets from '../public/webpack-assets.json';

const renderer = (req, res) => {
  const history = createHistory();
  const store = configureStore(history);

  // The method for loading data from server-side
  const loadBranchData = () => {
    const branch = matchRoutes(routes, req.path);

    const promises = branch.map(({ route, match }) => {
      if (route.loadData) {
        return Promise.all(
          route
            .loadData({ params: match.params, getState: store.getState })
            .map(item => store.dispatch(item))
        );
      }

      return Promise.resolve(null);
    });

    return Promise.all(promises);
  };

  (async () => {
    try {
      // Load data from server-side first
      await loadBranchData();

      const staticContext = {};
      const AppComponent = (
        <Provider store={store}>
          {/* Setup React-Router server-side rendering */}
          <StaticRouter location={req.path} context={staticContext}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>
      );

      // Check if the render result contains a redirect, if so we need to set
      // the specific status and redirect header and end the response
      if (staticContext.url) {
        res.status(301).setHeader('Location', staticContext.url);
        res.end();

        return;
      }

      // Extract loadable state from application tree (loadable-components setup)
      getLoadableState(AppComponent).then(loadableState => {
        const head = Helmet.renderStatic();
        const htmlContent = renderToString(AppComponent);
        const initialState = store.getState();
        const loadableStateTag = loadableState.getScriptTag();

        // Check page status
        const status = staticContext.status === '404' ? 404 : 200;

        // Pass the route and initial state into html template
        res
          .status(status)
          .send(
            renderHtml(
              head,
              assets,
              htmlContent,
              initialState,
              loadableStateTag
            )
          );
      });
    } catch (err) {
      res.status(404).send('Not found');

      console.error(chalk.red(`Rendering routes error: ${err}`));
    }
  })();
}

module.exports = renderer;
