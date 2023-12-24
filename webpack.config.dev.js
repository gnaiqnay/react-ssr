const { merge: webpackMerge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config.base.js')
const { localEnv } = require('./package.json')
const { ports, proxies } = localEnv
const output = webpackBaseConfig.output
const getProxy = proxies => {
    const proxy = {}
    Object.keys(proxies).forEach(key => {
        proxy[key] = {
            target: proxies[key],
            changeOrigin: true,
            pathRewrite: {
                [`^${key}`]: '',
            },
        }
    })
    return proxy
}
module.exports = webpackMerge(webpackBaseConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        host: '0.0.0.0',
        port: ports.local,
        http2: false,
        https: false,
        compress: false, // gzip 压缩
        historyApiFallback: {
            index: output.publicPath,
            disableDotRule: true,
        },
        proxy: getProxy(proxies),
    },
})
