const commonConfig = require('./webpack.common.js');
const {merge} = require('webpack-merge')
const path = require('path') // webpack内置模块

const proConfig = {
  mode: "production",
}

module.exports = merge(commonConfig, proConfig);
