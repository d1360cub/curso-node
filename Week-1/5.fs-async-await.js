const fs = require('node:fs/promises');

//La funcion es asincrona pero sigue siendo secuencial
async function readingFilesAsync() {
  const text = await fs.readFile('./ejemplo.txt', 'utf-8');
  console.log(`Leyendo el primer archivo: ${text}`);
  console.log('Esto viene despues de leer el primer archivo');
  const text2 = await fs.readFile('./archivo2.txt', 'utf-8');
  console.log(`Leyendo el segundo archivo: ${text2}`);
  console.log('Esto pasa despues de leer el segundo archivo');
}

readingFilesAsync();
