const path = require('path')
const dotenv = require('dotenv')
const webpack = require('webpack')

const entry = {
  index: './src/App.js',
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const plugins = []
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  const env = dotenv.config().parsed

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next])
    return prev
  }, {})

  plugins.push(new webpack.DefinePlugin({ envKeys }))
}

// const plugins = [
// new webpack.DefinePlugin({
//   'process.env.CLASS_SCHEDULE_FAIRFAX': JSON.stringify(process.env.CLASS_SCHEDULE_FAIRFAX),
//   'process.env.CLASS_SCHEDULE_CHANTILLY': JSON.stringify(process.env.CLASS_SCHEDULE_CHANTILLY),
//   'process.env.SCHOOL_PICKUP_FAIRFAX': JSON.stringify(process.env.SCHOOL_PICKUP_FAIRFAX),
//   'process.env.SCHOOL_PICKUP_CHANTILLY': JSON.stringify(process.env.SCHOOL_PICKUP_CHANTILLY),
//   'process.env.ROOM_FAIRFAX': JSON.stringify(process.env.ROOM_FAIRFAX),
//   'process.env.ROOM_CHANTILLY': JSON.stringify(process.env.ROOM_CHANTILLY),
//   'process.env.ABSENCES_SHEET': JSON.stringify(process.env.ABSENCES_SHEET),
//   'process.env.MAKEUPS_SHEET': JSON.stringify(process.env.MAKEUPS_SHEET),
//   'process.env.GOOGLE_API': JSON.stringify(process.env.GOOGLE_API),
//   'process.env.PRIVATE_KEY': JSON.stringify(privateKey),
//   'process.env.CLIENT_EMAIL': JSON.stringify(process.env.CLIENT_EMAIL),
// }),
// new webpack.DefinePlugin(envKeys),
// ]

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

const node = {
  net: 'empty',
  fs: 'empty',
  tls: 'empty',
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
  node,
}
