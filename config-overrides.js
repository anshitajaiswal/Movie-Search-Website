// Import webpack only once
const webpack = require('webpack');

module.exports = function overrideConfig(config, env) {
  // Add process polyfill using ProvidePlugin
  config.plugins.push(new webpack.ProvidePlugin({
    process: 'process/browser',
  }));

  // Include other polyfills for Node.js modules
  config.resolve.fallback = {
    ...config.resolve.fallback, // Preserve existing fallbacks
    "path": require.resolve("path-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "crypto": require.resolve("crypto-browserify"),
    "buffer": require.resolve("buffer/"),
    "stream": require.resolve("stream-browserify"),
    "vm": require.resolve("vm-browserify")
  };

  return config;
};
