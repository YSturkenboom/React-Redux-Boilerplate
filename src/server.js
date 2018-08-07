/* eslint-disable */

import path from 'path';
import morgan from 'morgan';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import favicon from 'serve-favicon';
import chalk from 'chalk';
import openBrowser from 'react-dev-utils/openBrowser';

import renderer from './renderer';
import { port, host } from './config';

// Create Express server
const app = express();

// Use helmet to secure Express with various HTTP headers
app.use(helmet());
// Prevent HTTP parameter pollution.
app.use(hpp());

app.use(favicon(path.resolve(process.cwd(), 'public/favicon.ico')));
app.use(morgan('dev'));

if (!__DEV__) {
  app.use(express.static(path.resolve(process.cwd(), 'public')));
} else {
  /* Run express as webpack dev server */
  const webpack = require('webpack');
  const webpackConfig = require('../tools/webpack/webpack.config');
  const compiler = webpack(webpackConfig);

  compiler.apply(new webpack.ProgressPlugin());

  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      headers: { 'Access-Control-Allow-Origin': '*' },
      hot: true,
      quiet: true, // Turn it on for friendly-errors-webpack-plugin
      noInfo: true,
      stats: 'minimal',
      serverSideRender: true
    })
  );

  app.use(
    require('webpack-hot-middleware')(compiler, {
      log: false // Turn it off for friendly-errors-webpack-plugin
    })
  );
}

// Register server-side rendering middleware
app.get('*', renderer);

// Start listening
if (port) {
  app.listen(port, host, err => {
    const url = `http://${host}:${port}`;

    if (err) console.error(chalk.red(`Error: ${err}`));

    console.info(chalk.green(`Listening at ${url}`));

    // Open browser
    if (openBrowser(url)) {
      console.info(chalk.green('Opened in browser'));
    }
  });
} else {
  console.error(chalk.red('Error! No PORT environment variable specified.'));
}
