const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')

const entry = {
  index: './src/App.js',
}

const env = dotenv.config().parsed

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

const plugins = [
  webpack.DefinePlugin(envKeys)
]

const output = {
  path: path.resolve(__dirname, 'public'),
  publicPath: '/public/',
  filename: 'bundle.js',
}

const devServer = {
  contentBase: path.join(__dirname, 'public'),
  publicPath: 'http://localhost:3000',
  port: 3000,
  compress: true,
  watchContentBase: true,
  historyApiFallback: true,
}

const babelLoader = {
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
  },
}

const styleLoader = {
  test: /.s?css$/,
  use: ['style-loader', 'css-loader'],
}

const imageLoader = {
  test: /\.(gif|svg|jpg|png)$/,
  loader: 'file-loader',
  include: path.join(__dirname, 'public', 'img'),
  options: {
    outputPath: path.join('img/cached-images'),
    publicPath: path.join('img/cached-images'),
  },
}

module.exports = {
  entry,
  output,
  devServer,
  module: {
    rules: [
      babelLoader,
      styleLoader,
      imageLoader,
    ],
  },
  plugins,
}
