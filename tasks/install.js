const Path    = require('path');
const Common  = require('./common');
const modules = require('./modules');

let root = Path.resolve(__dirname, '../Surface/source');

let commands = [];

for (let $module of modules)
{
    let source = Path.normalize(Path.join(root, $module.name));
    commands.push(Common.execute(`Installing ${$module.name}`, `cd ${source} && npm install`));
}

Promise.all(commands).then(() => console.log('\nDone!'));