# HTML!

Provides an HTML entry point that is pre-compiled by webpack and augmented with data on the server

- Scripts can be inlined (See L28 in webpack.config)
- Webpack can provide attributes for the script tags (L27 in webpack.config)
- Uses `{{handlebarSyntax}} for server rendering data into the HTML template

Dev mode (Webpack dev server)

```
npm run dev
```

Production mode

```
npm run build
npm start
```
