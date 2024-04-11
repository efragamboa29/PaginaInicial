// index.js

// Importa el módulo 'http' de Node.js
const http = require('http');

// Crea un servidor HTTP simple que responde 'Hello World!' a todas las solicitudes
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!\n');
});

// Escucha en el puerto 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Servidor escuchando en http://127.0.0.1:3000/');
});