const express = require('express');
const QRCode = require('qrcode');
const { getRandomError, getErrorByCode } = require('../utils/errorMessages');
const analytics = require('../utils/analytics');
const config = require('../config');
const logger = require('../utils/logger');

const router = express.Router();

/**
 * GET / - Display BSOD
 * Query parameters:
 *  - style: win10, win11, win7, winxp (default: win10)
 *  - code: specific error code to display
 *  - message: custom error message
 *  - technical: custom technical detail
 *  - qr: URL for QR code
 *  - percentage: completion percentage (0-100)
 *  - lang: language code (en, es, fr, de, jp, etc.)
 */
router.get('/', async (req, res) => {
  try {
    const {
      style = 'win10',
      code,
      message,
      technical,
      qr,
      percentage,
      lang = 'en',
    } = req.query;

    // Get error data
    let errorData;
    if (code) {
      errorData = getErrorByCode(code);
      if (!errorData) {
        errorData = getRandomError();
      }
    } else {
      errorData = getRandomError();
    }

    // Override with custom values if provided
    if (message) {
      errorData.description = message;
    }
    if (technical) {
      errorData.technicalDetail = technical;
    }
    if (percentage !== undefined) {
      errorData.percentage = Math.min(100, Math.max(0, parseInt(percentage) || 0));
    }

    // Generate QR code
    let qrCodeData = null;
    if (config.features.qrCodes) {
      const qrUrl = qr || config.features.defaultQrUrl;
      try {
        qrCodeData = await QRCode.toDataURL(qrUrl, {
          width: 150,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        });
      } catch (err) {
        logger.warn('QR code generation failed', { error: err.message });
      }
    }

    // Track analytics
    analytics.trackVisit(style, errorData.stopCode, !!(message || technical));

    // Render the appropriate view
    res.render(`bsod-${style}`, {
      ...errorData,
      qrCode: qrCodeData,
      lang,
      config: config.app,
    });
  } catch (err) {
    logger.error('Error rendering BSOD', { error: err.message });
    res.status(500).send('An error occurred while generating your blue screen. How ironic.');
  }
});

/**
 * GET /random - Redirect to random style
 */
router.get('/random', (req, res) => {
  const styles = ['win10', 'win11', 'win7', 'winxp'];
  const randomStyle = styles[Math.floor(Math.random() * styles.length)];
  res.redirect(`/?style=${randomStyle}`);
});

module.exports = router;
