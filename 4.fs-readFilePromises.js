//el modulo fs trae promises
const fs = require('node:fs/promises');

fs.readFile('./ejemplo.txt', 'utf-8').then((text) => {
  console.log(`Leyendo el primer archivo: ${text}`);
});

console.log('Esto viene despues de leer el primer archivo');

fs.readFile('./archivo2.txt', 'utf-8').then((text) => {
  console.log(`Leyendo el segundo archivo: ${text}`);
});

console.log('Esto pasa despues de leer el segundo archivo');
