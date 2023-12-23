const { merge: webpackMerge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config.base.js')
module.exports = webpackMerge(webpackBaseConfig, {
    mode: 'production',
})
