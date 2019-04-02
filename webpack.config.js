const path = require('path');
const express = require('express');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.join(__dirname,'frontend','index.js'),
  output: {
    path: path.join(__dirname,'frontend-dist'),
    filename: 'index.bundle.js',
    globalObject: `(typeof self !== 'undefined' ? self : this)`
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    modules: [path.resolve(__dirname, 'frontend'), 'node_modules'],
    alias: {
      frontend: path.resolve(__dirname, 'frontend')
    }
  },
  devServer: {
    contentBase: path.join(__dirname,'frontend'),
    before: function(app, server) {
      app.use('data', express.static('/frontend/data'))
    },
    historyApiFallback: true,
    port: 3333
  },
  module: {
    rules: [
      {
        // this is so that we can compile any React,
        // ES6 and above into normal ES5 syntax
        test: /\.(js|jsx)$/,
        // we do not want anything from node_modules to be compiled
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: path.join(__dirname,'frontend-dist')
            }
          },
          "css-loader", // translates CSS into CommonJS
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        loaders: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname,'frontend','index.html')
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css",
      chunkFilename: "[id].css"
    })
  ]
};