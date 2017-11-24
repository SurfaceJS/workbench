const common  = require('./common');
const modules = require('./modules');
const paths   = require('./paths');
const path    = require('path');

const fullInstall = !!process.argv[2];

let commands = [];

for (let $module of modules)
{
    let source = path.normalize(path.join(paths.modules, $module.name));

    let dependencies = require(path.join(source, 'package.json')).dependencies || {};

    let targets = Object.keys(dependencies)
        .filter(x => !x.startsWith('@surface/') || fullInstall)
        .map(key => `${key}@${dependencies[key].replace(/^(\^|\~)/, '')}`)
        .join(' ');

    if (targets)
        commands.push(common.execute(`${$module.name} dependencies installed.`, `cd ${source} && npm install ${targets} --save-exact`));
}

for (let targetPath of [paths.client, paths.server, paths.tests])
{
    let source = path.join(targetPath, '../');

    let dependencies = require(path.join(source, 'package.json')).dependencies || { };

    let targets = Object.keys(dependencies)
        .filter(x => !x.startsWith('@surface/') || fullInstall)
        .map(key => `${key}@${dependencies[key]}`)
        .join(' ');

    if (targets)
        commands.push(common.execute(`${path.parse(path.resolve(targetPath, '../')).name} dependencies installed.`, `cd ${source} && npm install ${targets} --save-exact`));
}

Promise.all(commands).then(() =>console.log('\nDone!'));