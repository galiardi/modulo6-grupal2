const http = require('http');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

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

      const fullPath = path.join(__dirname, 'data', `${fileName}.txt`);

      try {
        fs.writeFile(fullPath, fileContent, 'utf8', (err) => {
          if (err) {
            console.log(err);
            res.write('error');
            return res.end();
          }
          res.write('archivo creado');
          return res.end();
        });
      } catch (error) {
        console.log(error);
        res.write('error');
        res.end();
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
