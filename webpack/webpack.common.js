const webpack = require('webpack');

const {root} = require('./helpers');

// Moves styles into separate css files
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const mode = process.env.NODE_ENV || '';
const isDev = mode.includes('dev');
const CompressionPlugin = require('compression-webpack-plugin');
/**
 * This is a common webpack config which is the base for all builds
 */
module.exports = {
  devtool: isDev ? 'source-map' : false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss', '.html']
  },
  output: {
    path: root('dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader?sourceMap'
          }
        ]
      },
      {
        test: /.*favicon[^.]*\.png$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)(\?[a-z0-9=&.])*$/,
        exclude: /favicon/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },
      {
        test: /\.(woff2|woff|ttf|eot)(\?[a-z0-9=&.]+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: isDev ? '[path][name].[ext]' : 'assets/fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['link:href', 'img:src', 'use:xlink:href', '[attr.use:xlink:href]']
          }
        }
      },
      {
        test: /\.(txt|xml)(\?[a-z0-9=&.]+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename: 'css/[name].css'}),
    // new webpack.optimize.UglifyJsPlugin({
    //   minimize: !isDev,
    //   warnings: isDev,
    //   sourceMap: isDev,
    //   beautify: false,
    //   comments: false,
    //   mangle: true,
    //   compress: {
    //     sequences: true,
    //     booleans: true,
    //     loops: true,
    //     unused: true,
    //     warnings: false,
    //     drop_console: true,
    //     unsafe: true
    //   },
    //   output: {
    //     comments: false,
    //   },
    // }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.svg$/,
      minRatio: 0.8
    })
  ]
};
