const config = require('../config');
const logger = require('./logger');

/**
 * Simple in-memory analytics storage
 * In production, this would be replaced with a proper database
 */
class Analytics {
  constructor() {
    this.data = {
      totalVisits: 0,
      styleViews: {},
      errorCodeViews: {},
      customMessageCount: 0,
      apiCalls: 0,
      startTime: new Date(),
    };
  }

  /**
   * Track a page visit
   */
  trackVisit(style = 'win10', errorCode = null, isCustom = false) {
    if (!config.features.analytics) return;

    this.data.totalVisits++;

    // Track style views
    this.data.styleViews[style] = (this.data.styleViews[style] || 0) + 1;

    // Track error code views
    if (errorCode) {
      this.data.errorCodeViews[errorCode] = (this.data.errorCodeViews[errorCode] || 0) + 1;
    }

    // Track custom messages
    if (isCustom) {
      this.data.customMessageCount++;
    }

    logger.debug('Visit tracked', { style, errorCode, isCustom });
  }

  /**
   * Track an API call
   */
  trackApiCall() {
    if (!config.features.analytics) return;
    this.data.apiCalls++;
  }

  /**
   * Get analytics summary
   */
  getSummary() {
    const uptime = Date.now() - this.data.startTime.getTime();
    const uptimeSeconds = Math.floor(uptime / 1000);
    const uptimeMinutes = Math.floor(uptimeSeconds / 60);
    const uptimeHours = Math.floor(uptimeMinutes / 60);

    return {
      ...this.data,
      uptime: {
        ms: uptime,
        seconds: uptimeSeconds,
        minutes: uptimeMinutes,
        hours: uptimeHours,
        human: `${uptimeHours}h ${uptimeMinutes % 60}m ${uptimeSeconds % 60}s`,
      },
    };
  }

  /**
   * Reset analytics
   */
  reset() {
    this.data = {
      totalVisits: 0,
      styleViews: {},
      errorCodeViews: {},
      customMessageCount: 0,
      apiCalls: 0,
      startTime: new Date(),
    };
    logger.info('Analytics reset');
  }
}

module.exports = new Analytics();
