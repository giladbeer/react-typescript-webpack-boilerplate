const webpackCommon = require('./webpack-common');

module.exports = () => {
  return {
    mode: 'development',
    ...webpackCommon('staging'),
    devtool: 'eval-cheap-source-map',
    devServer: {
      host: '0.0.0.0',
      port: 8080,
      compress: true,
      open: true,
      useLocalIp: true,
      overlay: true,
      historyApiFallback: true
    },
    output: {
      publicPath: '/',
    },
    stats: 'errors-only'
  }
};
