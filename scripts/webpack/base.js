const { Config } = require('webpack-config');
const path = require('path');

module.exports = new Config().merge({
  entry: {
    launcher: './lib/pages/launcher',
    dashboard: './lib/pages/dashboard',
    vendors: ['react', 'react-dom', 'antd'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            enforce: true,
            chunks: 'all'
        },
      },
    },
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          plugins: [
            ['import', { libraryName: "antd", "libraryDirectory": "es", style: "less" }]
          ],
        },
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: "[local]-[hash:base64:5]"
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      }
    ]
  },
  resolve: {
    alias: {
      '@database': path.resolve(__dirname, '../../lib/database'),
      '@events': path.resolve(__dirname, '../../lib/events'),
      '@components': path.resolve(__dirname, '../../lib/components'),
      '@pages': path.resolve(__dirname, '../../lib/pages'),
      '@global': path.resolve(__dirname, '../../lib/global'),
    }
  }
});
