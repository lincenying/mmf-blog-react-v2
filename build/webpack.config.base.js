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
            '~': path.join(__dirname, '../src'),
            '@': path.join(__dirname, '../src')
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx']
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
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'less-loader', options: { sourceMap: true } }
                ]
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
