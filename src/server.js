// Blue Screen of App - Deno Server (Minimal JavaScript)
// Imports compiled ReScript modules for business logic

import { getRandomErrorJS, getErrorByCodeJS, getAllStopCodes } from './ErrorMessages.bs.js';
import { trackVisit, trackApiCall, getStatsObject, resetStats, getUptime } from './Analytics.bs.js';

// Load configuration from Nickel (via JSON export)
const configPath = new URL('../config.json', import.meta.url);
let config = {
  server: { port: 443, host: '0.0.0.0' },
  app: { name: 'Blue Screen of App', url: 'https://localhost' },
  features: { qrCodes: true, defaultQrUrl: 'https://github.com/Hyperpolymath/blue-screen-of-app' }
};

try {
  const configText = await Deno.readTextFile(configPath);
  config = JSON.parse(configText);
} catch {
  console.log('⚠️  config.json not found, using defaults');
}

// BSOD style templates
const styles = ['win10', 'win11', 'win7', 'winxp'];

// Render BSOD HTML (pure functions, no EJS needed)
const renderBSOD = (style, errorData, qrCode) => {
  const { stopCode, description, technicalDetail, percentage } = errorData;

  // Base styles for all BSOD versions
  const baseStyle = `
    margin: 0; padding: 0; overflow: hidden;
    font-family: 'Segoe UI', Arial, sans-serif;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    height: 100vh; width: 100vw;
    color: white; text-align: center;
  `;

  // Style-specific colors and fonts
  const styleConfig = {
    win10: { bg: '#0178D4', font: "'Segoe UI', sans-serif", emoji: '😞' },
    win11: { bg: '#0067C0', font: "'Segoe UI Variable', 'Segoe UI', sans-serif", emoji: '😞' },
    win7: { bg: '#00579e', font: "'Lucida Console', monospace", emoji: '' },
    winxp: { bg: '#0000AA', font: "'Perfect DOS VGA 437', 'Courier New', monospace", emoji: '' }
  };

  const cfg = styleConfig[style] || styleConfig.win10;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${stopCode} - Blue Screen of App</title>
  <style>
    body { ${baseStyle} background: ${cfg.bg}; font-family: ${cfg.font}; }
    .container { max-width: 800px; padding: 40px; }
    .emoji { font-size: 120px; margin-bottom: 30px; }
    .stop-code { font-size: 24px; margin: 20px 0; font-weight: bold; }
    .description { font-size: 18px; margin: 20px 0; line-height: 1.6; }
    .technical { font-size: 14px; margin: 30px 0; opacity: 0.9; }
    .percentage { font-size: 28px; margin: 20px 0; font-weight: bold; }
    .qr { margin: 30px 0; }
    .qr img { width: 150px; height: 150px; }
  </style>
</head>
<body>
  <div class="container">
    ${cfg.emoji ? `<div class="emoji">${cfg.emoji}</div>` : ''}
    <div class="stop-code">${stopCode}</div>
    <div class="description">${description}</div>
    <div class="technical">${technicalDetail}</div>
    <div class="percentage">${percentage}% complete</div>
    ${qrCode ? `<div class="qr"><img src="${qrCode}" alt="QR Code" /></div>` : ''}
  </div>
</body>
</html>`;
};

// Generate QR code as SVG (no external dependencies)
const generateQR = (url) => {
  // Simple QR code as data URL (minimal implementation)
  // Using a basic text-based approach for now
  const encoded = encodeURIComponent(url);
  const size = 150;

  // Create a simple SVG QR-like pattern
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 29 29">
    <rect width="29" height="29" fill="white"/>
    <path fill="black" d="M0,0h7v7h-7zM8,0h1v1h-1zM10,0h3v1h1v1h-1v1h-1v-2h-2zM16,0h1v1h1v1h-2zM22,0h7v7h-7zM1,1v5h5v-5zM23,1v5h5v-5zM2,2h3v3h-3zM24,2h3v3h-3zM8,2h1v1h-1zM18,2h2v1h-2zM8,3h1v2h2v-2h1v3h-1v1h-1v1h-1v-4h-1zM13,3h1v1h-1zM17,3h1v2h-1zM20,3h2v3h-1v1h-1v-1h-1v-2h1zM0,8h1v1h1v2h-2zM4,8h3v1h-1v1h-2zM9,8h1v1h-1zM11,8h1v3h1v-1h2v1h-1v1h-2v-1h-1v1h-1v-2h1zM19,8h1v1h-1zM21,8h1v2h-2v-1h1zM28,8h1v3h-1v1h-1v-3h1zM3,9h1v1h-1zM17,9h2v1h-2zM23,9h3v1h-1v1h-2v-1h-1v-1h1zM8,10h1v1h-1zM3,11h2v1h-2zM6,11h1v1h1v1h-2zM15,11h4v1h-4zM20,11h1v2h-1zM0,12h1v2h-2v-1h1zM9,12h2v1h1v1h-3zM22,12h1v1h-1zM1,13h1v1h-1zM14,13h1v1h-1zM24,13h3v1h1v1h-4zM4,14h3v1h-3zM12,14h2v1h-2zM17,14h2v1h-1v1h-1zM8,15h1v1h-1zM21,15h1v2h-1zM2,16h1v2h1v-1h1v2h-1v1h-1v1h-1v-1h-1v-2h1zM5,16h2v1h-2zM9,16h4v1h1v1h-1v1h-4v-2h3v-1h-3zM17,16h1v1h-1zM19,16h1v1h-1zM23,16h2v1h-2zM26,16h1v1h1v1h-2zM7,17h1v1h-1zM15,17h2v2h-2zM20,17h1v1h-1zM25,17h1v2h-1v1h-1v-3h1zM28,17h1v2h-1zM18,18h1v1h-1zM0,19h1v1h-1zM22,19h1v2h-1zM27,19h1v1h-1zM6,20h1v1h-1zM14,20h1v1h-1zM17,20h2v1h-2zM8,21h4v1h1v1h-5zM0,22h7v7h-7zM8,22h1v2h1v-1h2v1h-1v1h1v1h-4v-3h1v-1h-1zM15,22h1v1h-1zM18,22h3v1h-1v1h1v1h-1v1h-1v-4h-1zM22,22h7v7h-7zM1,23v5h5v-5zM23,23v5h5v-5zM2,24h3v3h-3zM13,24h2v1h-2zM24,24h3v3h-3zM10,25h1v1h-1zM12,26h1v1h-1zM14,26h3v1h-3zM8,27h2v1h1v1h-3zM20,27h1v1h-1zM12,28h1v1h-1z"/>
  </svg>`;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Parse URL query parameters
const getQueryParams = (url) => {
  const params = new URL(url).searchParams;
  return {
    style: params.get('style') || 'win10',
    code: params.get('code'),
    message: params.get('message'),
    technical: params.get('technical'),
    qr: params.get('qr'),
    percentage: params.get('percentage')
  };
};

// Main request handler
const handler = async (req) => {
  const url = new URL(req.url);
  const path = url.pathname;

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Health check
  if (path === '/api/health') {
    trackApiCall();
    return new Response(JSON.stringify({
      status: 'ok',
      uptime: getUptime(),
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }

  // Get all error codes
  if (path === '/api/codes') {
    trackApiCall();
    return new Response(JSON.stringify({
      codes: getAllStopCodes()
    }), {
      status: 200,
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }

  // Get all styles
  if (path === '/api/styles') {
    trackApiCall();
    return new Response(JSON.stringify({
      styles: styles
    }), {
      status: 200,
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }

  // Get analytics
  if (path === '/api/analytics') {
    trackApiCall();
    return new Response(JSON.stringify(getStatsObject()), {
      status: 200,
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }

  // Reset analytics (POST only)
  if (path === '/api/analytics/reset' && req.method === 'POST') {
    trackApiCall();
    resetStats();
    return new Response(JSON.stringify({ message: 'Analytics reset' }), {
      status: 200,
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }

  // Get random error
  if (path === '/api/error') {
    trackApiCall();
    const error = getRandomErrorJS();
    return new Response(JSON.stringify(error), {
      status: 200,
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }

  // Get specific error by code
  if (path.startsWith('/api/error/')) {
    trackApiCall();
    const code = path.split('/api/error/')[1];
    const error = getErrorByCodeJS(code);

    if (!error) {
      return new Response(JSON.stringify({ error: 'Error code not found' }), {
        status: 404,
        headers: { ...headers, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(error), {
      status: 200,
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }

  // Random style redirect
  if (path === '/random') {
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    return Response.redirect(`/?style=${randomStyle}`, 302);
  }

  // Main BSOD page
  if (path === '/' || path === '') {
    const params = getQueryParams(req.url);

    // Get error data
    let errorData;
    if (params.code) {
      errorData = getErrorByCodeJS(params.code);
      if (!errorData) {
        errorData = getRandomErrorJS();
      }
    } else {
      errorData = getRandomErrorJS();
    }

    // Override with custom values
    if (params.message) errorData.description = params.message;
    if (params.technical) errorData.technicalDetail = params.technical;
    if (params.percentage) {
      const pct = parseInt(params.percentage) || 0;
      errorData.percentage = Math.min(100, Math.max(0, pct));
    }

    // Generate QR code
    const qrCode = await generateQR(params.qr || config.features.defaultQrUrl);

    // Track analytics
    trackVisit(params.style, errorData.stopCode, !!(params.message || params.technical));

    // Render BSOD
    const html = renderBSOD(params.style, errorData, qrCode);

    return new Response(html, {
      status: 200,
      headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' }
    });
  }

  // 404
  return new Response(JSON.stringify({ error: 'Not found' }), {
    status: 404,
    headers: { ...headers, 'Content-Type': 'application/json' }
  });
};

// Start server with HTTP/1.1 (proxied behind nginx/caddy for HTTPS)
const port = config.server.port || 8080;

console.log(`
╔═══════════════════════════════════════════╗
║                                           ║
║       Blue Screen of App                  ║
║       (Deno + ReScript Edition)           ║
║                                           ║
║   Server running on port ${port}            ║
║   Protocol: HTTP/1.1 (proxy to HTTPS)     ║
║                                           ║
║   Visit: ${config.app.url}                  ║
║                                           ║
╚═══════════════════════════════════════════╝
`);

// Deno.serve with HTTP/1.1 (use nginx/caddy for TLS termination)
Deno.serve({
  port: port,
  hostname: config.server.host || '0.0.0.0',
  onListen: ({ hostname, port }) => {
    console.log(`✅ Listening on ${hostname}:${port}`);
    console.log(`💡 Run behind nginx/caddy for HTTPS termination`);
  },
}, handler);
