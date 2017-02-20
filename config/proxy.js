module.exports = {
    '/api': {
        target: 'http://localhost:4000/',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/api'
        }
    }
}
