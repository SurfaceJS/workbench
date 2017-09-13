const Path    = require('path');
const execute = require('./execute');
const modules = require('./modules');

let surfaceRoot = Path.resolve(__dirname, '../Surface/source');

let commands = [];

commands.push(execute(`Compiling server`, `tsc -p ${Path.resolve(__dirname, '../App.Server/start')}`));

for (let $module of modules)
    commands.push(execute(`Compiling ${$module.name}`, `tsc -p ${Path.normalize(`${surfaceRoot}/${$module.name}`)}`));

Promise.all(commands).then(() => console.log('\nDone!'));