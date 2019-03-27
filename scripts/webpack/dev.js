const path = require('path');
const { Config } = require('webpack-config');
const WriteFilePlugin = require('write-file-webpack-plugin');

const config = new Config().extend(path.resolve(__dirname, './base.js')).merge({
  mode: 'development',
  devtool: "cheap-module-source-map",
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '../dist/',
  },
  plugins: [
    new WriteFilePlugin()
  ]
});

module.exports = config;
