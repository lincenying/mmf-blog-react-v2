const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const baseWebpackConfig = require('./webpack.config.base')
const config = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: '#cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader'
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader'
            },
            {
                test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            '@store': path.join(__dirname, '../src/store/conf.dev'),
            '@devtools': path.join(__dirname, '../src/components/global/devtools')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new FriendlyErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
        new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ["vendor"]
        // }),
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'app'],
            filename: 'index.html',
            template: 'src/template/index.html',
            inject: true
        }),
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'admin'],
            filename: 'backend.html',
            template: 'src/template/backend.html',
            inject: true
        })
    ]
})

Object.keys(config.entry).forEach(function(name) {
    config.entry[name] = ['react-hot-loader/patch', 'webpack-hot-middleware/client?reload=true&noInfo=false'].concat(
        config.entry[name]
    )
})

module.exports = config
