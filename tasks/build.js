const Path    = require('path');
const execute = require('./execute');
const modules = require('./modules');

let surfaceRoot = Path.resolve(__dirname, '../Surface/source/@surface');

for (let $module of modules)
    execute(`Compiling ${$module.name}`, `tsc -p ${surfaceRoot}/${$module.name}`);