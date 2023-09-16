//importar un json en ESmodules
import { createRequire } from 'node:module';

const localRequire = createRequire(import.meta.url);

export const readJSON = (path) => localRequire(path);
