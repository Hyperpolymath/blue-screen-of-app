const express = require('express');
const { getRandomError, getErrorByCode, errorMessages } = require('../utils/errorMessages');
const analytics = require('../utils/analytics');
const logger = require('../utils/logger');

const router = express.Router();

/**
 * GET /api/error - Get random error data
 */
router.get('/error', (req, res) => {
  analytics.trackApiCall();
  const error = getRandomError();
  res.json({
    success: true,
    data: error,
  });
});

/**
 * GET /api/error/:code - Get specific error by code
 */
router.get('/error/:code', (req, res) => {
  analytics.trackApiCall();
  const error = getErrorByCode(req.params.code);

  if (!error) {
    return res.status(404).json({
      success: false,
      error: 'Error code not found',
      availableCodes: errorMessages.stopCodes,
    });
  }

  res.json({
    success: true,
    data: error,
  });
});

/**
 * GET /api/codes - List all available error codes
 */
router.get('/codes', (req, res) => {
  analytics.trackApiCall();
  res.json({
    success: true,
    data: {
      codes: errorMessages.stopCodes,
      count: errorMessages.stopCodes.length,
    },
  });
});

/**
 * GET /api/styles - List all available styles
 */
router.get('/styles', (req, res) => {
  analytics.trackApiCall();
  res.json({
    success: true,
    data: {
      styles: ['win10', 'win11', 'win7', 'winxp'],
      default: 'win10',
    },
  });
});

/**
 * GET /api/analytics - Get analytics data
 */
router.get('/analytics', (req, res) => {
  const summary = analytics.getSummary();
  res.json({
    success: true,
    data: summary,
  });
});

/**
 * POST /api/analytics/reset - Reset analytics (dev only)
 */
router.post('/analytics/reset', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({
      success: false,
      error: 'Not available in production',
    });
  }

  analytics.reset();
  res.json({
    success: true,
    message: 'Analytics reset successfully',
  });
});

/**
 * GET /api/health - Health check endpoint
 */
router.get('/health', (req, res) => {
  const summary = analytics.getSummary();
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: summary.uptime,
    version: require('../../package.json').version,
  });
});

/**
 * GET /api/metrics - Prometheus-style metrics
 */
router.get('/metrics', (req, res) => {
  const summary = analytics.getSummary();

  const metrics = [
    `# HELP bsod_total_visits Total number of BSOD page visits`,
    `# TYPE bsod_total_visits counter`,
    `bsod_total_visits ${summary.totalVisits}`,
    '',
    `# HELP bsod_api_calls Total number of API calls`,
    `# TYPE bsod_api_calls counter`,
    `bsod_api_calls ${summary.apiCalls}`,
    '',
    `# HELP bsod_custom_messages Total number of custom messages`,
    `# TYPE bsod_custom_messages counter`,
    `bsod_custom_messages ${summary.customMessageCount}`,
    '',
    `# HELP bsod_uptime_seconds Application uptime in seconds`,
    `# TYPE bsod_uptime_seconds gauge`,
    `bsod_uptime_seconds ${summary.uptime.seconds}`,
  ].join('\n');

  res.set('Content-Type', 'text/plain');
  res.send(metrics);
});

module.exports = router;
