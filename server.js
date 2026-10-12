const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const PORT = Number(process.env.PORT || 3000);
const html = fs.readFileSync(path.join(__dirname, 'index.html'));
const server = http.createServer((req, res) => {
  if (req.url !== '/' && req.url !== '/index.html') {
    res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end('Not found');
    return;
  }
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Length': html.length,
    'Cache-Control': 'public, max-age=300',
    'X-Content-Type-Options': 'nosniff'
  });
  if (req.method === 'HEAD') {res.end(); return;}
  res.end(html);
});
server.listen(PORT, '0.0.0.0', () => console.log(`Invitation ready on port ${PORT}`));
