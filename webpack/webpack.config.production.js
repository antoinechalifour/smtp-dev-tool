const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const config = require('../config')

const clientPort = config.client.port
const clientHost = config.client.host
const smtpPort = config.smtp.port
const smtpHost = config.smtp.host
const socketPort = config.app.port
const socketHost = config.app.host

const smtpServer = `smtp://${smtpHost}:${smtpPort}`
const devServer = `${clientHost}:${clientPort}`

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    path: path.join(__dirname, '../public'),
    filename: '[name].[hash].js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules'),
    }],
  },
  plugins: [
    new ExtractTextPlugin('[name].[hash].css'),
    new HtmlPlugin({
      template: path.join(__dirname, '../client/index.html'),
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      __SERVER__: JSON.stringify(`${socketHost}:${socketPort}`),
      __SMTP__: JSON.stringify(smtpServer),
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
}