process.env.NODE_ENV = 'development'

const chalk = require('chalk')
const opn = require('opn')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const configDev = require('./webpack.config.dev')
const config = require('../config/index')

const port = process.env.PORT || config.dev.port

// This shouldn't be exposed to the user.
let handleCompile
const isSmokeTest = process.argv.some(arg => arg.indexOf('--smoke-test') > -1)
if (isSmokeTest) {
    handleCompile = function(err, stats) {
        if (err || stats.hasErrors() || stats.hasWarnings()) {
            process.exit(1)
        } else {
            process.exit(0)
        }
    }
}

const friendlySyntaxErrorLabel = 'Syntax error:'

function isLikelyASyntaxError(message) {
    return message.indexOf(friendlySyntaxErrorLabel) !== -1
}

// This is a little hacky.
// It would be easier if webpack provided a rich error object.

function formatMessage(message) {
    return (
        message
            // Make some common errors shorter:
            .replace(
                // Babel syntax error
                'Module build failed: SyntaxError:',
                friendlySyntaxErrorLabel
            )
            .replace(
                // Webpack file not found error
                /Module not found: Error: Cannot resolve 'file' or 'directory'/,
                'Module not found:'
            )
            // Internal stacks are generally useless so we strip them
            // at ... ...:x:y
            .replace(/^\s*at\s.*:\d+:\d+[\s\)]*\n/gm, '')
            // Webpack loader names obscure CSS filenames
            .replace('./~/css-loader!./~/postcss-loader!', '')
    )
}

function clearConsole() {
    process.stdout.write('\x1B[2J\x1B[0f')
}

const compiler = webpack(configDev, handleCompile)
compiler.plugin('invalid', function() {
    clearConsole()
    console.log('Compiling...')
})
compiler.plugin('done', function(stats) {
    clearConsole()
    const hasErrors = stats.hasErrors()
    const hasWarnings = stats.hasWarnings()
    if (!hasErrors && !hasWarnings) {
        console.log(chalk.green('Compiled successfully!'))
        console.log()
        console.log(`The app is running at http://localhost:${port}/`)
        console.log()
        return
    }

    const json = stats.toJson()
    const formattedErrors = json.errors.map(message => 'Error in ' + formatMessage(message))
    const formattedWarnings = json.warnings.map(message => 'Warning in ' + formatMessage(message))

    if (hasErrors) {
        console.log(chalk.red('Failed to compile.'))
        console.log()
        if (formattedErrors.some(isLikelyASyntaxError)) {
            // If there are any syntax errors, show just them.
            // This prevents a confusing ESLint parsing error
            // preceding a much more useful Babel syntax error.
            formattedErrors = formattedErrors.filter(isLikelyASyntaxError)
        }
        formattedErrors.forEach(message => {
            console.log(message)
            console.log()
        })
        // If errors exist, ignore warnings.
        return
    }

    if (hasWarnings) {
        console.log(chalk.yellow('Compiled with warnings.'))
        console.log()
        formattedWarnings.forEach(message => {
            console.log(message)
            console.log()
        })

        console.log('You may use special comments to disable some warnings.')
        console.log('Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.')
        console.log('Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.')
    }
})

function openBrowser() {
    // Fallback to opn
    // (It will always open new tab)
    opn(`http://localhost:${port}/`)
}

new WebpackDevServer(compiler, {
    historyApiFallback: true,
    // Note: only CSS is currently hot reloaded
    hot: true,
    publicPath: configDev.output.publicPath,
    quiet: true,
    proxy: {
        '/api/**': {
            target: 'http://localhost:4000/',
            secure: false,
            changeOrigin: true
        }
    }
}).listen(port, 'localhost', function(err) {
    if (err) {
        return console.log(err)
    }

    clearConsole()
    console.log(chalk.cyan('Starting the development server...'))
    console.log()
    openBrowser()
})
