const { merge: webpackMerge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config.base.js')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { name, parcel } = require('./package.json')
const { format } = parcel
module.exports = webpackMerge(webpackBaseConfig, {
    mode: 'production',
    devtool: 'hidden-source-map',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    plugins: [
        new FileManagerPlugin({
            events: {
                onStart: [
                    {
                        delete: ['./dist'],
                    },
                ],
                onEnd: [
                    {
                        copy: [
                            {
                                source: './build',
                                destination: `./dist/${name}`,
                            },
                        ],
                        archive: [
                            {
                                source: './dist',
                                destination: `./dist/${name}.${format}`,
                                format: format,
                            },
                        ],
                    },
                ],
            },
        }),
    ],
})
