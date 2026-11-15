const fs = require('node:fs');
const path = require('node:path');

const destino = path.join(__dirname, 'dist');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
fs.mkdirSync(destino, { recursive: true });
fs.writeFileSync(path.join(destino, 'index.html'), html.replace('<body ', '<body data-hosting="netlify" '));
