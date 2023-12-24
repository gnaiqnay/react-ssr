const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const CONTENT_HASH = '[contenthash:8]'
const BUILD_PATH = 'build'
const ASSETS_PATH = 'assets'

// const NODE_ENV = process.env.NODE_ENV
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
        publicPath: '/',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            // 通用组件
            Components: path.resolve(__dirname, 'src/components/'),
            // 业务组件
            Features: path.resolve(__dirname, 'src/features/'),
            Config: path.resolve(__dirname, 'src/config/'),
            Constants: path.resolve(__dirname, 'src/constants/'),
            Contexts: path.resolve(__dirname, 'src/contexts/'),
            Router: path.resolve(__dirname, 'src/router/'),
            Hooks: path.resolve(__dirname, 'src/hooks/'),
            Assets: path.resolve(__dirname, 'src/assets/'),
            Layouts: path.resolve(__dirname, 'src/layouts/'),
            Pages: path.resolve(__dirname, 'src/pages/'),
            Api: path.resolve(__dirname, 'src/api/'),
            Styles: path.resolve(__dirname, 'src/styles/'),
            Utils: path.resolve(__dirname, 'src/utils/'),
            Store: path.resolve(__dirname, 'src/store/'),
            TsTypes: path.resolve(__dirname, 'src/tsTypes/'),
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
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
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
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
        // JS 规范检测
        new ESLintPlugin({
            fix: true,
            cache: true,
            extensions: ['js', 'jsx', 'ts', 'tsx'],
            // overrideConfigFile: `.eslintrc${NODE_ENV === 'development' ? '' : '.prod'}.js`,
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
