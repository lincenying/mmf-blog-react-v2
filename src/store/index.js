if (process.env.NODE_ENV === 'production') {
    module.exports = require('./conf.prod')
} else {
    module.exports = require('./conf.dev')
}
