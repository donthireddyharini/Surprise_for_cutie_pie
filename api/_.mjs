import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the server from dist
const { default: server } = await import(join(__dirname, '..', 'dist', 'server', 'server.js'));

// Vercel expects (req, res) Node.js request/response
export default async (req, res) => {
  try {
    // Build the full URL
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = new URL(req.url || '/', `${protocol}://${host}`);
    
    const method = req.method || 'GET';
    const headers = new Headers(req.headers);
    
    // Build request body if needed
    let body = undefined;
    if (method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS') {
      body = await new Promise((resolve, reject) => {
        const chunks = [];
        req.on('data', chunk => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
      });
    }

    // Create Web API Request
    const webRequest = new Request(url, {
      method,
      headers,
      body: body && body.length > 0 ? body : undefined,
    });

    // Call the server fetch handler
    const response = await server.fetch(webRequest);

    // Set status code
    res.statusCode = response.status;
    
    // Copy headers
    for (const [key, value] of response.headers) {
      res.setHeader(key, value);
    }

    // Send body
    if (response.body) {
      const arrayBuffer = await response.arrayBuffer();
      res.end(Buffer.from(arrayBuffer));
    } else {
      res.end();
    }
  } catch (error) {
    console.error('Error in Vercel handler:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal Server Error', message: error.message }));
  }
};
