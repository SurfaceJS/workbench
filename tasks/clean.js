const Path     = require('path');
const Common   = require('./common');
const modules  = require('./modules');
const paths    = require('./paths');
const patterns = require('./patterns');

paths.modules = Path.resolve(__dirname, paths.modules);
paths.server  = Path.resolve(__dirname, Path.join(paths.server, 'source'));

for (let $module of modules)
{
    let source = Path.normalize(Path.join(paths.modules, $module.name));
    console.log(`Cleaning ${$module.name}`);
    Common.cleanup(source, patterns.clean.include, patterns.clean.exclude);
}

console.log(`Cleaning server`);
Common.cleanup(paths.server, patterns.clean.include, patterns.clean.exclude);
