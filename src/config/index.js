require('dotenv').config();

module.exports = {
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
  },
  app: {
    name: process.env.APP_NAME || 'Blue Screen of App',
    url: process.env.APP_URL || 'http://localhost:3000',
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
  features: {
    analytics: process.env.ENABLE_ANALYTICS === 'true',
    qrCodes: process.env.ENABLE_QR_CODES !== 'false',
    defaultQrUrl: process.env.DEFAULT_QR_URL || 'https://github.com',
  },
  security: {
    corsOrigin: process.env.CORS_ORIGIN || '*',
    helmetEnabled: process.env.HELMET_ENABLED !== 'false',
  },
};
