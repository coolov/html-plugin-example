const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;
const lodashTemplate = require('lodash.template');

let devMode = process.env.NODE_ENV === 'development';

// This will be `true` when the webpack dev server is ready
let webpackIsReady = false;

// Use the Webpack dev server middleware in dev mode
if (devMode) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('./webpack.config');
  const middleware = webpackDevMiddleware(webpack(webpackConfig));

  middleware.waitUntilValid(() => {
    webpackIsReady = true;
  });

  app.use(middleware);
}

// Loads and compiles the lodash/handlebars template
// Uses handlebars-style interpolation, like this: <h1>{{title}}</h1>
// https://lodash.com/docs/4.17.11#template
const loadTemplate = src =>
  lodashTemplate(fs.readFileSync(src).toString(), {
    interpolate: /\{\{(.+?)\}\}/g
  });

// Compiles the handlebars template (once in prod, lazilly in dev)
// And renders the html with the provided data
let compiledTemplate;
function renderHTML(data) {
  // Wait for webpack dev-server in dev mode
  if (devMode && !webpackIsReady) {
    return 'Loading...';
  }

  // Always recompile the underscore template in dev mode
  // (In production the template will only be compiled at boot time)
  if (devMode || !compiledTemplate) {
    console.log('loading & compiling the html template...');
    compiledTemplate = loadTemplate(__dirname + '/dist/lodash-template.html');
  }

  return compiledTemplate(data);
}

app.get('/', (req, res) => {
  // This is a stub for data comming from Apollo
  const dehydratedData = {};

  // This is a stub for HTML comming from React SSR
  const reactHTML = '<dialog open>HOLA!</dialog>';

  // Constants, environment variables etc
  const constants = {
    GQL_HOST: 'graphql.com'
  };

  const html = renderHTML({
    title: 'HELLO!',
    dehydratedData: JSON.stringify(dehydratedData),
    constants: JSON.stringify(constants),
    reactHTML
  });

  res.send(html);
});

app.use(express.static('dist'));
app.listen(port, () => console.log(`Listening on port ${port}!`));
