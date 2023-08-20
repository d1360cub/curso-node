const os = require('node:os');

console.log('OS Name:', os.platform());
console.log('OS Version:', os.release());
console.log(`Architecure: ${os.arch()}`);
console.log(`CPUs: ${os.cpus()}`);
console.log(`Total RAM: ${os.totalmem() / 1024 / 1024}`);
console.log(`Free RAM: ${os.freemem() / 1024 / 1024}`);
