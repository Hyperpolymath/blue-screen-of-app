// Blue Screen of App - Minimal Deno Server
import { getRandomErrorJS, getErrorByCodeJS, getAllStopCodes } from './ErrorMessages.bs.js';
import { trackVisit, trackApiCall, getStatsObject, resetStats, getUptime } from './Analytics.bs.js';

// Config
const configPath = new URL('../config.json', import.meta.url);
let config = { server: { port: 8080, host: '0.0.0.0' }, app: { name: 'BSOD', url: 'http://localhost:8080' } };
try { config = JSON.parse(await Deno.readTextFile(configPath)); } catch {}

// BSOD Styles
const styles = {
  win10: { bg: '#0178D4', font: "'Segoe UI', sans-serif", emoji: '😞' },
  win11: { bg: '#0067C0', font: "'Segoe UI Variable', sans-serif", emoji: '😞' },
  win7: { bg: '#00579e', font: "'Lucida Console', monospace", emoji: '' },
  winxp: { bg: '#0000AA', font: "'Courier New', monospace", emoji: '' }
};

// Render BSOD
const renderBSOD = (style, { stopCode, description, technicalDetail, percentage }, qr) => {
  const s = styles[style] || styles.win10;
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${stopCode}</title><style>body{margin:0;padding:0;overflow:hidden;font-family:${s.font};display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;width:100vw;color:#fff;text-align:center;background:${s.bg}}.c{max-width:800px;padding:40px}.e{font-size:120px;margin-bottom:30px}.sc{font-size:24px;margin:20px 0;font-weight:bold}.d{font-size:18px;margin:20px 0;line-height:1.6}.t{font-size:14px;margin:30px 0;opacity:.9}.p{font-size:28px;margin:20px 0;font-weight:bold}.q img{width:150px;height:150px}</style></head><body><div class="c">${s.emoji?`<div class="e">${s.emoji}</div>`:''}<div class="sc">${stopCode}</div><div class="d">${description}</div><div class="t">${technicalDetail}</div><div class="p">${percentage}% complete</div>${qr?`<div class="q"><img src="${qr}" alt="QR"></div>`:''}</div></body></html>`;
};

// QR Code (minimal SVG)
const qr = url => `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 29 29"><rect width="29" height="29" fill="#fff"/><path fill="#000" d="M0,0h7v7h-7zM8,0h1v1h-1zM10,0h3v1h1v1h-1v1h-1v-2h-2zM16,0h1v1h1v1h-2zM22,0h7v7h-7zM1,1v5h5v-5zM23,1v5h5v-5zM2,2h3v3h-3zM24,2h3v3h-3zM8,2h1v1h-1zM18,2h2v1h-2zM8,3h1v2h2v-2h1v3h-1v1h-1v1h-1v-4h-1zM13,3h1v1h-1zM17,3h1v2h-1zM20,3h2v3h-1v1h-1v-1h-1v-2h1zM0,8h1v1h1v2h-2zM4,8h3v1h-1v1h-2zM9,8h1v1h-1zM11,8h1v3h1v-1h2v1h-1v1h-2v-1h-1v1h-1v-2h1zM19,8h1v1h-1zM21,8h1v2h-2v-1h1zM28,8h1v3h-1v1h-1v-3h1zM3,9h1v1h-1zM17,9h2v1h-2zM23,9h3v1h-1v1h-2v-1h-1v-1h1zM8,10h1v1h-1zM3,11h2v1h-2zM6,11h1v1h1v1h-2zM15,11h4v1h-4zM20,11h1v2h-1zM0,12h1v2h-2v-1h1zM9,12h2v1h1v1h-3zM22,12h1v1h-1zM1,13h1v1h-1zM14,13h1v1h-1zM24,13h3v1h1v1h-4zM4,14h3v1h-3zM12,14h2v1h-2zM17,14h2v1h-1v1h-1zM8,15h1v1h-1zM21,15h1v2h-1zM2,16h1v2h1v-1h1v2h-1v1h-1v1h-1v-1h-1v-2h1zM5,16h2v1h-2zM9,16h4v1h1v1h-1v1h-4v-2h3v-1h-3zM17,16h1v1h-1zM19,16h1v1h-1zM23,16h2v1h-2zM26,16h1v1h1v1h-2zM7,17h1v1h-1zM15,17h2v2h-2zM20,17h1v1h-1zM25,17h1v2h-1v1h-1v-3h1zM28,17h1v2h-1zM18,18h1v1h-1zM0,19h1v1h-1zM22,19h1v2h-1zM27,19h1v1h-1zM6,20h1v1h-1zM14,20h1v1h-1zM17,20h2v1h-2zM8,21h4v1h1v1h-5zM0,22h7v7h-7zM8,22h1v2h1v-1h2v1h-1v1h1v1h-4v-3h1v-1h-1zM15,22h1v1h-1zM18,22h3v1h-1v1h1v1h-1v1h-1v-4h-1zM22,22h7v7h-7zM1,23v5h5v-5zM23,23v5h5v-5zM2,24h3v3h-3zM13,24h2v1h-2zM24,24h3v3h-3zM10,25h1v1h-1zM12,26h1v1h-1zM14,26h3v1h-3zM8,27h2v1h1v1h-3zM20,27h1v1h-1zM12,28h1v1h-1z"/></svg>`)}`;

// Router
const routes = {
  '/': async (req) => {
    const params = new URL(req.url).searchParams;
    const style = params.get('style') || 'win10';
    const code = params.get('code');

    let err = code ? getErrorByCodeJS(code) || getRandomErrorJS() : getRandomErrorJS();
    if (params.get('message')) err.description = params.get('message');
    if (params.get('technical')) err.technicalDetail = params.get('technical');
    if (params.get('percentage')) err.percentage = Math.min(100, Math.max(0, parseInt(params.get('percentage')) || 0));

    trackVisit(style, err.stopCode, !!(params.get('message') || params.get('technical')));
    return new Response(renderBSOD(style, err, params.get('qr') ? qr(params.get('qr')) : null), { headers: { 'Content-Type': 'text/html' } });
  },
  '/random': () => Response.redirect(`/?style=${['win10','win11','win7','winxp'][Math.floor(Math.random()*4)]}`, 302),
  '/api/error': () => { trackApiCall(); return json(getRandomErrorJS()); },
  '/api/codes': () => { trackApiCall(); return json({ codes: getAllStopCodes() }); },
  '/api/styles': () => { trackApiCall(); return json({ styles: Object.keys(styles) }); },
  '/api/analytics': () => { trackApiCall(); return json(getStatsObject()); },
  '/api/health': () => { trackApiCall(); return json({ status: 'ok', uptime: getUptime(), timestamp: new Date().toISOString() }); }
};

const json = obj => new Response(JSON.stringify(obj), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });

// Handler
const handler = async req => {
  const path = new URL(req.url).pathname;

  // API error by code
  if (path.startsWith('/api/error/')) {
    trackApiCall();
    const err = getErrorByCodeJS(path.split('/api/error/')[1]);
    return err ? json(err) : json({ error: 'Not found' }, 404);
  }

  // Analytics reset (POST)
  if (path === '/api/analytics/reset' && req.method === 'POST') {
    trackApiCall();
    resetStats();
    return json({ message: 'Reset' });
  }

  // Route lookup
  const route = routes[path];
  if (route) return route(req);

  return json({ error: 'Not found' }, 404);
};

// Server
const port = config.server.port || 8080;
console.log(`
╔════════════════════════════════════╗
║  Blue Screen of App (Deno)         ║
║  Port: ${port}                          ║
║  ${config.app.url}              ║
╚════════════════════════════════════╝`);

Deno.serve({ port, hostname: config.server.host || '0.0.0.0', onListen: ({ hostname, port }) => {
  console.log(`✅ ${hostname}:${port}`);
}}, handler);
