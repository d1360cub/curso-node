const fs = require('node:fs');

const text = fs.readFileSync('./ejemplo.txt', 'utf-8');

console.log(`Leyendo el primer archivo: ${text}`);

const text2 = fs.readFileSync('./archivo2.txt', 'utf-8');

console.log(`Leyendo el segundo archivo: ${text2}`);
