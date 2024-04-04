const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.tokenguard.io/db-api',
      changeOrigin: true,
    })
  );
};