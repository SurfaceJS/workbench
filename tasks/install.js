const path    = require('path');
const common  = require('./common');
const modules = require('./modules');
const paths   = require('./paths');

let commands = [];

for (let $module of modules)
{
    let source = path.normalize(path.join(paths.modules, $module.name));
    commands.push(common.execute(`Installing ${$module.name}`, `cd ${source} && npm install`));
}

Promise.all(commands).then
(
    () => Promise.all
    (
        [
            common.execute(`Installing Client`, `cd ${paths.client} && npm install`),
            common.execute(`Installing Server`, `cd ${paths.server} && npm install`),
            common.execute(`Installing Tests`,  `cd ${paths.tests} && npm install`)
        ]
    )
    .then(() =>console.log('\nDone!'))
);