// Minimal static server for Railway with no dependencies.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const page = fs.readFileSync(path.join(__dirname, 'index.html'));
const port = Number(process.env.PORT || 3000);
http.createServer((req, res) => {
  const route = (req.url || '/').split('?')[0];
  if (route === '/' || route === '/index.html') {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
      'X-Content-Type-Options': 'nosniff'
    });
    if (req.method === 'HEAD') return res.end();
    return res.end(page);
  }
  if(route==='/favicon.ico') {res.writeHead(204); return res.end();}
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
}).listen(port, '0.0.0.0', () => console.log(`Invitation listening on port ${port}`));
