const path     = require('path');
const common   = require('./common');
const modules  = require('./modules');
const paths    = require('./paths');
const patterns = require('./patterns');

for (let $module of modules)
{
    let source = path.normalize(path.join(paths.modules, $module.name));
    console.log(`Cleaning ${$module.name}`);
    common.cleanup(source, patterns.clean.include, patterns.clean.exclude);
}

console.log(`Cleaning server`);
common.cleanup(paths.server, patterns.clean.include, patterns.clean.exclude);
