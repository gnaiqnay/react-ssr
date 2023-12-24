module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3,
                targets: ['last 2 version', 'ie >= 10'],
            },
        ],
        ['@babel/preset-react', { runtime: 'automatic' }], // 不需要引入react
        '@babel/preset-typescript',
    ],
}
