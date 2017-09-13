const FS = require('fs');
const Path = require('path');

const execute = require('./execute');
const modules = require('./modules');
const Utils = require('./utils');

let versions = { };

if (FS.existsSync('./versions.json'))
    versions = require('./versions.json');

let toPublish = [];

for (let $module of modules)
{
    if (!versions[$module.name])
    {
        versions[$module.name] = $module.version;
        toPublish.push($module.name);
    }
    
    if (versions[$module.name] < $module.version)
    {
        toPublish.push($module.name);
    }
}

const root = Path.resolve(__dirname, '../Surface/source');

for (let $module of toPublish)
{
    let source = Path.normalize(Path.join(root, $module));
    Utils.cleanup(source, /\.(js(\.map)?|d\.ts)$/, /@types|node_modules/);
    execute(`Compiling ${source}`, `tsc -p ${source} --noEmit false --declaration true`);
}

FS.writeFileSync('./versions.json', JSON.stringify(versions));