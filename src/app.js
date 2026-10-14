const http = require('http');
const url = require('url');
const fs = require('fs');

const app = http.createServer((req, res) => {

  const q = url.parse(req.url, true);
  
  res.setHeader('Content-Type', 'text/html');

  if (q.pathname === '/calc') {
    const operation = q.query.operation;
    const a = Number(q.query.a);
    const b = Number(q.query.b);

    if (operation === 'add') {
      res.writeHead(200);
      res.end(String(a + b));
    } else if (operation === 'sub') {
      res.writeHead(200);
      res.end(String(a - b));
    } else if (operation === 'mul') {
      res.writeHead(200);
      res.end(String(a * b));
    } else if (operation === 'div') {
      res.writeHead(200);
      res.end(String(a / b));
    } else {
      res.writeHead(400);
      res.end('Operation unknown');
    }
  } 
  else if (q.pathname === '/fs') {
    const operation = q.query.operation;
    const filename = q.query.filename;
    const text = q.query.text || '';

    if (operation === 'create') {
      fs.writeFile(filename, text, (err) => {
        if (err) {
          res.writeHead(500);
          return res.end('Server Error');
        }
        res.writeHead(201);
        res.end(`${filename} was created`);
      });
    } else if (operation === 'read') {
      fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
          res.writeHead(400);
          return res.end('File not found');
        }
        res.writeHead(201);
        res.end(data);
      });
    } else {
      res.writeHead(400);
      res.end('Operation unknown');
    }
  } 
  else {
    res.writeHead(400);
    res.end('Operation unknown');
  }
});

module.exports = app;
