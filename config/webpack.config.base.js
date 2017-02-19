var path = require('path')
var webpack = require('webpack')

var isInNodeModules = 'node_modules' === path.basename(path.resolve(path.join(__dirname, '..', '..')))
var relativePath = isInNodeModules ? '../../..' : '..'
var isInDebugMode = process.argv.some(arg =>
    arg.indexOf('--debug-template') > -1
)
if (isInDebugMode) {
    relativePath = '..'
}
var srcPath = path.resolve(__dirname, relativePath, 'src')
var nodeModulesPath = path.join(__dirname, '..', 'node_modules')
var buildPath = path.join(__dirname, isInNodeModules ? '../../..' : '..', 'dist')

var config = {
    entry: {
        app: [
            path.join(srcPath, 'index.jsx')
        ]
    },
    output: {
        path: buildPath,
        pathinfo: true,
        filename: '[name].js',
        publicPath: '/'
    },
    externals: {
        'jquery': 'jQuery'
    },
    resolve: {
        alias: {
            "assets": path.join(__dirname, "../src/assets"),
            "~api": path.join(__dirname, "../src/api"),
            "~components": path.join(__dirname, "../src/components"),
            "~decorators": path.join(__dirname, "../src/decorators"),
            "~pages": path.join(__dirname, "../src/pages"),
            "~actions": path.join(__dirname, "../src/store/reducers"),
            "~reducers": path.join(__dirname, "../src/store/reducers")
        },
        extensions: ['.js', '.jsx']
    },
    resolveLoader: {
        modules: [nodeModulesPath]
    },
    module: {
        rules: [{
            test: /\.js|\.jsx$/,
            loader: 'eslint-loader',
            enforce: "pre",
            include: srcPath
        }, {
            test: /\.js|\.jsx$/,
            include: srcPath,
            exclude: /node_modules/,
            loader: ['babel-loader']
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        },{
            test: /\.(mp4|webm)$/,
            loader: 'url-loader?limit=10000'
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                eslint: {
                    useEslintrc: true
                }
            }
        })
    ]
}

module.exports = config
