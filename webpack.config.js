const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin= require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: { 'js/index,js': './src/index.js','css/main.css': './src/scss/main.scss'},
  output: {
    path: __dirname + '/build/',
    filename: "[name]"
  },
  devServer: {
    contentBase: './build',
  },
  optimization: {
    runtimeChunk: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {name: 'img/[name].[ext]'}
          }
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyWebpackPlugin([
    {
      from: './src/img',
      to: './img'
    },
  ]),
  ],
};
