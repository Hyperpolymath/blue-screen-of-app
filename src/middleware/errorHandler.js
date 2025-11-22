const logger = require('../utils/logger');

/**
 * Global error handling middleware
 */
function errorHandler(err, req, res, next) {
  logger.error('Error occurred', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
  });

  // Don't leak error details in production
  const isDev = process.env.NODE_ENV !== 'production';

  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal server error',
      ...(isDev && { stack: err.stack }),
    },
  });
}

/**
 * 404 handler
 */
function notFoundHandler(req, res) {
  res.status(404).json({
    error: {
      message: 'Route not found',
      path: req.url,
    },
  });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
