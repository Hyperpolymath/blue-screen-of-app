const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

const config = require('./config');
const logger = require('./utils/logger');
const requestLogger = require('./middleware/requestLogger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const bsodRoutes = require('./routes/bsod');
const apiRoutes = require('./routes/api');

const app = express();

// Create logs directory if it doesn't exist
if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

// Security middleware
if (config.security.helmetEnabled) {
  app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP to allow inline styles for BSOD
  }));
}

// CORS
app.use(cors({
  origin: config.security.corsOrigin,
}));

// Compression
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(requestLogger);

// Static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api', apiRoutes);
app.use('/', bsodRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = config.server.port;
const server = app.listen(PORT, () => {
  logger.info(`Blue Screen of App started`, {
    port: PORT,
    environment: config.server.env,
    url: config.app.url,
  });
  console.log(`
  ╔═══════════════════════════════════════════╗
  ║                                           ║
  ║       Blue Screen of App                  ║
  ║                                           ║
  ║   Server running on port ${PORT}            ║
  ║   Environment: ${config.server.env.padEnd(20)} ║
  ║                                           ║
  ║   Visit: ${config.app.url.padEnd(28)} ║
  ║                                           ║
  ╚═══════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

module.exports = app;
