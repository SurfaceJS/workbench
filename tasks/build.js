const path     = require('path');
const common   = require('./common');
const modules  = require('./modules');
const paths    = require('./paths');
const patterns = require('./patterns');

let commands = [];

//commands.push(Common.execute(`Compiling server`, `tsc -p ${Path.join(paths.server, 'source')}`));

for (let $module of modules)
{
    let source = path.normalize(path.join(paths.modules, $module.name));
    common.cleanup(source, patterns.clean.include, patterns.clean.exclude);
    commands.push(common.execute(`Compiling ${$module.name}`, `tsc -p ${source}`));
}

Promise.all(commands).then(() => console.log('\nDone!'));