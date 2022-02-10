'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/JS/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/src/JS'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
