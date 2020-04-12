const path = require('path')
const webpack = require('webpack')

const isInNodeModules = 'node_modules' === path.basename(path.resolve(path.join(__dirname, '..', '..')))
let relativePath = isInNodeModules ? '../../..' : '..'
const isInDebugMode = process.argv.some(arg => arg.indexOf('--debug-template') > -1)
if (isInDebugMode) {
    relativePath = '..'
}
const srcPath = path.resolve(__dirname, relativePath, 'src')
const nodeModulesPath = path.join(__dirname, '..', 'node_modules')
const buildPath = path.join(__dirname, isInNodeModules ? '../../..' : '..', 'dist')
const isProd = process.env.NODE_ENV === 'production'

const config = {
    performance: {
        hints: 'warning', // 枚举
        maxAssetSize: 30000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
        assetFilter(assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
        }
    },
    entry: {
        app: [path.join(srcPath, 'index.jsx')],
        admin: [path.join(srcPath, 'backend.jsx')]
    },
    output: {
        path: buildPath,
        pathinfo: true,
        filename: '[name].js',
        publicPath: '/'
    },
    externals: {
        jquery: 'jQuery'
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
            '@': path.join(__dirname, '../src'),
            '~': path.join(__dirname, '../src')
        },
        extensions: ['.js', '.jsx']
    },
    resolveLoader: {
        modules: [nodeModulesPath]
    },
    module: {
        rules: [
            {
                test: /\.js|\.jsx$/,
                include: srcPath,
                exclude: /node_modules/,
                loader: ['babel-loader']
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
}

module.exports = config
