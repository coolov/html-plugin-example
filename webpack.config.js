const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    inline: './client/inline.js',
    index: './client/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'lodash-template.html',
      template: './client/index.html',
      inject: 'head',
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      // Set the defer attribute to the script tags
      // Defer is the winning solution in terms of speed 🏆
      // https://flaviocopes.com/javascript-async-defer/#with-async-in-the-head
      defaultAttribute: 'defer',
      inline: 'inline'
    })
  ]
};
