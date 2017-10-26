const ngtools = require('@ngtools/webpack');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonPartial = require('./webpack/webpack.common');
const clientPartial = require('./webpack/webpack.client');
const serverPartial = require('./webpack/webpack.server');
const prodPartial = require('./webpack/webpack.prod');
const { getAotPlugin } = require('./webpack/webpack.aot');

module.exports = function (options, webpackOptions) {
  options = options || {};

  const apiUrl = options.apiUrl;
  const port = options.PORT;
  const mode = options.mode;
  console.log({
    url: apiUrl || 'Default',
    port: port || 'Default',
    mode: mode || 'Prod'
  });

  if (options.aot) {
    console.log(`Running build for ${options.client ? 'client' : 'server'} with AoT Compilation`)
  }

  const serverConfig = webpackMerge({}, commonPartial, serverPartial, {
    entry: options.aot ? './src/main.server.aot.ts' : serverPartial.entry, // Temporary
    plugins: [
      getAotPlugin('server', !!options.aot),
      new webpack.DefinePlugin({
        'process.env.BACKEND_URL': JSON.stringify(apiUrl),
        'process.env.PORT': JSON.stringify(port),
        'process.env.isDev': JSON.stringify(mode === 'dev'),
      }),
    ]
  });

  let clientConfig = webpackMerge({}, commonPartial, clientPartial, {
    plugins: [
      getAotPlugin('client', !!options.aot)
    ]
  });

  if (webpackOptions.p) {
    clientConfig = webpackMerge({}, clientConfig, prodPartial);
  }

  const configs = [];
  if (!options.aot) {
    configs.push(clientConfig, serverConfig);
  } else if (options.client) {
    configs.push(clientConfig);
  } else if (options.server) {
    configs.push(serverConfig);
  }

  return configs;
};
