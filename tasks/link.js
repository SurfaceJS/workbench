const fs      = require('fs');
const path    = require('path');
const common  = require('./common');
const modules = require('./modules');
const paths   = require('./paths');

let action = process.argv[2];

let targets =
[
    { name: 'Client', path: path.resolve(paths.client, '../node_modules/@surface') },
    { name: 'Server', path: path.resolve(paths.server, '../node_modules/@surface') },
    { name: 'Tests',  path: path.resolve(paths.tests,  '../node_modules/@surface') }
];

if (action == 'l' || action == 'link')
{
    link();
}
else if (action == 'u' || action == 'unlink')
{
    unlink();
}
else if (action == 'r' || action == 'relink')
{
    relink();
}

async function link()
{
    for (let $module of modules)
    {
        for (let dependence of common.objectToDictionary($module.dependencies).filter(x => x.key.startsWith('@surface/')))
        {
            let source = path.normalize(path.join(paths.modules, dependence.key));
            let target = path.normalize(path.join(paths.modules, $module.name, 'node_modules'));

            common.makeDir(path.join(target, '@surface'));

            target = path.normalize(path.join(target, dependence.key));

            if (!fs.existsSync(target))
                await common.execute(`Linking ${$module.name} dependence[${dependence.key}]:`, `mklink /J ${target} ${source}`);
        }
    }
        
    for (let target of targets)
    {
        let nodeModules = path.resolve(target.path, '../');

        if (!fs.existsSync(nodeModules))
            fs.mkdirSync(nodeModules);

        if (!fs.existsSync(target.path))
            await common.execute(`Linking @surface on ${target.name}:`, `mklink /J ${target.path} ${path.join(paths.modules, '@surface')}`);
    }

    console.log('Linking done!');
}

async function unlink()
{
    for (let $module of modules)
    {
        let targetFolder = path.normalize(path.join(paths.modules, $module.name, 'node_modules', '@surface'));

        if (fs.existsSync(targetFolder))
            await common.execute(`Removing @surface on ${$module.name}:`, `rmdir /s /q ${targetFolder}`);
    }

    for (let target of targets)
    {
        if (fs.existsSync(target.path))
            await common.execute(`Unlinking @surface link on ${target.name}:`, `rmdir /s /q ${target.path}`);
    }

    console.log('Unlinking done!');
}

async function relink()
{
    await unlink();
    await link();
}