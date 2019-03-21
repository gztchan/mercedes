const { Config } = require('webpack-config');

module.exports = new Config().merge({
  entry: {
    launcher: './lib/pages/launcher.js',
  },
  // plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
      },
      // {
      //   test: /\.less$/,
      //   use: []
      // }
    ]
  }
});
