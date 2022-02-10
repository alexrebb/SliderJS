'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './example/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/src/JS'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
