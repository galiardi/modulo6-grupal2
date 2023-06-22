const http = require('http');
const path = require('path');
const fs = require('fs');
const { PORT } = require('./config');

const server = http.createServer((req, res) => {
  if (req.url === '/archivos' && req.method === 'POST') {
    const rawData = [];
    req.on('data', (chunks) => {
      rawData.push(chunks);
    });

    req.on('end', () => {
      const body = JSON.parse(Buffer.concat(rawData).toString());
      console.log(body);
      const { fileName, fileContent } = body;

      const fullPath = path.join(__dirname, '..', 'data', `${fileName}.txt`);

      fs.writeFile(fullPath, fileContent, 'utf8', (err) => {
        if (err) {
          console.log('errooooooooooooooooooooooooor!!!!!!!!!!!!!');
          res.status(500);
          return res.json({ message: 'error' });
        }
        return res.json({ message: 'archivo creado' });
      });
    });
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
