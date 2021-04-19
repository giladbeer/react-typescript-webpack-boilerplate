const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
  const envPath = `.env.${env}` // path to .env file (staging or production)

  const plugins = [
    new Dotenv({
      path: envPath,
      systemvars: true
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(path.join(__dirname, 'src/index.html')),
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[hash].css'
    })
  ]

  if (env === 'production') {
    plugins.push(
      // clean build dir
      new CleanWebpackPlugin(),
      // purge unused CSS
    //   new PurgecssPlugin({
    //     paths: glob.sync(`${path.resolve(path.join(__dirname, './src/'))}/**/*`,  { nodir: true }),
    //   })
    )
  }

  return {
    entry: path.join(__dirname, 'src/index.tsx'),
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.gif', '.png', '.jpg', '.jpeg', '.svg']
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'ts-loader'
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader'
        },
        {
          test: /\.css$/,
          loader: 'css-loader'
        },
        {
          test: /\.(png|svg|jpe?g|gif|ico)$/i,
          include : path.resolve(path.join(__dirname, 'src/assets/img')),
          use: [
            {
              loader: require.resolve('url-loader'),
                options: {
                limit: 10000,
                name: 'assets/img/[name].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins
  }
};
