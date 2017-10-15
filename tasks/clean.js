const Path     = require('path');
const Common   = require('./common');
const modules  = require('./modules');
const patterns = require('./patterns');

let root = Path.resolve(__dirname, '../Surface/source');

for (let $module of modules)
{
    let source = Path.normalize(Path.join(root, $module.name));
    console.log(`Cleaning ${$module.name}`);
    Common.cleanup(source, patterns.clean.include, patterns.clean.exclude);
}