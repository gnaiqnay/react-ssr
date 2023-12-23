const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const CONTENT_HASH = '[contenthash:8]'
const BUILD_PATH = 'dist'
const ASSETS_PATH = 'assets'

const NODE_ENV = process.env.NODE_ENV
module.exports = {
    target: ['web', 'es5'],
    cache: {
        type: 'filesystem', // 默认缓存在: /node_modules/.cache/webpack
    },
    entry: {
        main: [path.resolve(__dirname, 'src', 'index.ts')],
    },
    output: {
        path: path.resolve(__dirname, BUILD_PATH),
        filename: `${ASSETS_PATH}/js/[name].${CONTENT_HASH}.js`,
        chunkFilename: `${ASSETS_PATH}/js/[name].${CONTENT_HASH}.chunk.js`,
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@': ['src/*'],
            Components: ['src/components/*'],
            Features: ['src/features/*'],
            Config: ['src/config/*'],
            Constants: ['src/constants/*'],
            Contexts: ['src/contexts/*'],
            Hooks: ['src/hooks/*'],
            Assets: ['src/assets/*'],
            Layouts: ['src/layouts/*'],
            Pages: ['src/pages/*'],
            Api: ['src/api/*'],
            Styles: ['src/styles/*'],
            Utils: ['src/utils/*'],
            Store: ['src/store/*'],
            TsTypes: ['src/tsTypes/*'],
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.s[a|c]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                /**
                 * 全局图片
                 */
                test: /\.(bmp|png|jpg|jpeg|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: `${ASSETS_PATH}/images/[name].${CONTENT_HASH}[ext]`,
                },
            },
            {
                /**
                 * favicon
                 */
                test: /\.ico$/,
                include: path.resolve(__dirname, 'src/assets'),
                type: 'asset/resource',
                generator: {
                    filename: `${ASSETS_PATH}/images/[name][ext]`,
                },
            },
            {
                /**
                 * 全局字体
                 */
                test: /\.(woff|eot|ttf)$/,
                type: 'asset/resource',
                generator: {
                    filename: `${ASSETS_PATH}/fonts/[name].${CONTENT_HASH}[ext]`,
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        // JS 规范检测
        new ESLintPlugin({
            fix: true,
            cache: true,
            extensions: ['js', 'jsx', 'ts', 'tsx'],
            overrideConfigFile: `.eslintrc${NODE_ENV === 'development' ? '' : '.prod'}.js`,
        }),
        new MiniCssExtractPlugin({
            filename: `${ASSETS_PATH}/css/[name].${CONTENT_HASH}.css`,
            chunkFilename: `${ASSETS_PATH}/css/[name].${CONTENT_HASH}.chunk.css`, // chunk css file
            ignoreOrder: true,
        }),
    ],
    optimization: {
        splitChunks: {
            minSize: 10,
            minChunks: 1,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        emitOnErrors: false,
    },
}
