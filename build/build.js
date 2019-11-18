/* eslint-disable */

process.env.NODE_ENV = 'production'

require('shelljs/global')
const path = require('path')
const webpack = require('webpack')
const configProd = require('./webpack.config.prod')

const isInNodeModules = 'node_modules' === path.basename(path.resolve(path.join(__dirname, '..', '..')))
const relative = isInNodeModules ? '../..' : '.'
rm('-rf', relative + '/dist/static')
mkdir('-p', relative + '/dist/static')
cp('-R', 'static/', relative + '/dist/')
cp('-R', 'favicon.ico', relative + '/dist/')

webpack(configProd).run(function(err, stats) {
    if (err) {
        console.log(err);
        console.error('Failed to create a production build. Reason:')
        console.error(err.message || err)
        process.exit(1)
    }
    process.stdout.write(
        stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n'
    )

    const openCommand = process.platform === 'win32' ? 'start' : 'open'
    console.log('Successfully generated a bundle in the build folder!')
    console.log()
    console.log('You can now serve it with any static server, for example:')
    console.log('  cd dist')
    console.log('  npm install -g http-server')
    console.log('  hs')
    console.log('  ' + openCommand + ' http://localhost:8080')
    console.log()
    console.log('The bundle is optimized and ready to be deployed to production.')
})
