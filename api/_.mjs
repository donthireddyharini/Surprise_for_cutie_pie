import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let server;

async function getServer() {
  if (!server) {
    try {
      const { default: srv } = await import(join(__dirname, '..', 'dist', 'server', 'server.js'));
      server = srv;
    } catch (e) {
      console.error('Failed to load server:', e);
      throw e;
    }
  }
  return server;
}

export default async (req, res) => {
  try {
    const srv = await getServer();
    
    // Get the server fetch function
    const fetch = srv.fetch || srv;
    if (typeof fetch !== 'function') {
      throw new Error('Server does not have a fetch function');
    }

    // Build URL
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const pathname = req.url || '/';
    const url = `${protocol}://${host}${pathname}`;
    
    const method = req.method || 'GET';

    // Prepare body
    let body;
    if (method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS') {
      body = await new Promise((resolve, reject) => {
        const chunks = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
      });
    }

    // Create request
    const webReq = new Request(url, {
      method,
      headers: req.headers,
      body: body && body.length > 0 ? body : undefined,
    });

    // Get response
    const response = await fetch(webReq);

    // Set status
    res.statusCode = response.status;

    // Set headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Send body
    const buffer = await response.arrayBuffer();
    res.end(Buffer.from(buffer));
  } catch (err) {
    console.error('Handler error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<h1>Error</h1><p>${err.message}</p>`);
  }
};
