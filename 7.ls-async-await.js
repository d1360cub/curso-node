const fs = require("node:fs/promises");
const path = require("node:path");

const folder = process.argv[2] ?? ".";

async function ls(folder) {
  let files;
  try {
    files = await fs.readdir(folder);
  } catch (error) {
    console.error(`No se puede leer el directorio: ${folder}`);
    process.exit(1);
  }

  const filePromises = files.map(async (file) => {
    const filePath = path.join(folder, file);
    let stats;
    try {
      stats = await fs.stat(filePath);
    } catch (error) {
      console.error(`No se puede leer el archivo: ${filePath}`);
      process.exit(1);
    }

    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? "D" : "f";
    const fileSize = stats.size;
    return `${file.padEnd(20)} ${fileType.padStart(10)} ${fileSize}`;
  });

  const fileInfo = await Promise.all(filePromises);

  fileInfo.forEach((file) => {
    console.log(file);
  });
}

ls(folder);
