const Path    = require('path');
const Common  = require('./common');
const modules = require('./modules');

let root = Path.resolve(__dirname, '../Surface/source');

let commands = [];

commands.push(Common.execute(`Installing Client`, `cd ${Path.resolve(__dirname, '../App.Client')} && npm install`));
commands.push(Common.execute(`Installing Client`, `cd ${Path.resolve(__dirname, '../App.Server')} && npm install`));

for (let $module of modules)
{
    let source = Path.normalize(Path.join(root, $module.name));
    commands.push(Common.execute(`Installing ${$module.name}`, `cd ${source} && npm install`));
}

Promise.all(commands).then(() => console.log('\nDone!'));