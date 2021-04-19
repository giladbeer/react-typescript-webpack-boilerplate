const path = require('path');
const webpackCommon = require('./webpack-common');
const chalk = require('chalk');
const TerserPlugin = require('terser-webpack-plugin');
const log = console.log;

module.exports = (env) => {
  let mode = 'production';

  if (env.staging) {
    mode = 'development'
  }

  const targetEnv = env.production ? 'production' : 'staging';

  log(chalk.green('\r\n\r\n\t************************************************\r\n'));
  log(chalk`\t{green Generating an ${mode === 'production' ? 'optimised' : 'un-optimised'} build for} {red "${targetEnv}"}`)
  log(chalk.green('\r\n\t************************************************\r\n\r\n'));

  return {
    mode,
    ...webpackCommon(targetEnv), // arg specifies which .env file to load
    output: {
      path: path.resolve(path.join(__dirname, './dist')),
      filename: '[name].bundle.[hash].js',
      chunkFilename: '[name].bundle.[hash].js',
      publicPath: '/',
    },
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    // webpack minifies by default in production mode
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            sourceMap: true,
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    }
  }
};
