const express = require('express');
const rickSanchez = require('./rickandmorty/rickSanchez.json');

const app = express();

app.disable('x-powered-by'); //Deshabilita x-powered-by enviado por express

app.get('/rickandmorty/ricksanchez', (req, res) => {
  res.json(rickSanchez);
});

/*
//Usando middleware (next())
app.use((req, res, next) => {
  if (req.method !== 'POST') return next();
  if (req.headers['content-type'] !== 'application/json') return next();
  // solo llegan request que son POST y que tienen el header Content-Type: application/json
  let body = '';
  
  // escuchar el evento data
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  
  req.on('end', () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();
    // mutar la request y meter la información en el req.body
    req.body = data;
    next();
  });
});
*/

//Remplazamos todo lo anterior por el middleware de express que parsea el json
app.use(express.json());

app.post('/character', (req, res) => {
  res.status(201).json(req.body);
});

// la última ruta que va a probar si no encuentra el match en ninguna de las anteriores
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>');
});

app.listen(3001, () => {
  console.log('server listening on port 3001');
});
