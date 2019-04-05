const path = require('path')

const entry = {
  index: './src/App.js',
}

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
}
