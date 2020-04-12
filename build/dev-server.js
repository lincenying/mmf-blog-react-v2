/* global require, module, process */

const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('../config')
const { createProxyMiddleware } = require('http-proxy-middleware')
const webpackConfig = require('./webpack.config.dev')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
// compiler.plugin('compilation', function(compilation) {
//     compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
//         hotMiddleware.publish({
//             action: 'reload'
//         })
//         cb && cb()
//     })
// })

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
    const options = proxyTable[context]
    if (typeof options === 'string') {
        options = {
            target: options
        }
    }
    app.use(createProxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
const history = require('connect-history-api-fallback')
app.use(
    history({
        rewrites: [
            { from: 'index', to: '/index.html' },
            { from: /\/backend/, to: '/backend.html' },
            { from: /^\/backend\/.*$/, to: '/backend.html' }
        ]
    })
)

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
})
