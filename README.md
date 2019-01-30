# HTML!

Provides an HTML entry point that is pre-compiled by webpack and augmented with data on the server

- Scripts can be inlined (See L28 in webpack.config)
- Webpack can provide attributes for the script tags (L27 in webpack.config)
- Uses `{{handlebarSyntax}}` for server rendering data into the HTML template

Tech:

- [HTMLWebpackPlugin](https://github.com/jantimon/html-webpack-plugin) for compiling the HTML
- [Script Extension for HTML Webpack Plugin](https://github.com/numical/script-ext-html-webpack-plugin) for inlining scripts and augmenting script tags with arguments like `defer`
- Lodash templates for server rendering

Dev mode (Webpack dev server)

```
npm run dev
```

Production mode

```
npm run build
npm start
```
