const FS   = require('fs');
const Path = require('path');

const modules = require('./modules');
const execute = require('./execute');
const Utils   = require('./utils');

let action = process.argv[2];

let root   = Path.resolve(__dirname, '../Surface/source');
let client = Path.resolve(__dirname, '../App.Client');

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
        for (let dependence of Utils.objectToDictionary($module.dependencies).filter(x => x.key.startsWith('@surface/')))
        {
            let source = Path.normalize(`${root}\\${dependence.key}`);
            let target = Path.normalize(`${root}\\${$module.name}\\node_modules`);

            Utils.makeDir(target + '\\@surface');

            target = Path.normalize(`${target}\\${dependence.key}`);

            if (!FS.existsSync(target))
                await execute(`Linking ${$module.name} dependence[${dependence.key}]:`, `mklink /J ${target} ${source}`);
        }
    }
        
    if (!FS.existsSync(`${client}\\node_modules\\@surface`))
        await execute(`Linking @surface on client:`, `mklink /J ${client}\\node_modules\\@surface ${root}\\@surface`);

    console.log('Linking done!');
}

async function unlink()
{
    if (FS.existsSync(`${client}\\node_modules\\@surface`))
        await execute(`Unlinking @surface link on client:`, `rmdir ${client}\\node_modules\\@surface`);

    for (let $module of modules)
    {
        for (let dependence of Utils.objectToDictionary($module.dependencies).filter(x => x.key.startsWith('@surface/')))
        {
            let targetModule = Path.normalize(`${root}\\${$module.name}\\node_modules\\${dependence.key}`);
            
            if (FS.existsSync(targetModule))
                await execute(`Unlinking ${$module.name} dependence[${dependence.key}]:`, `rmdir ${targetModule}`);
            
        }

        let targetFolder = Path.normalize(`${root}\\${$module.name}\\node_modules\\@surface`);

        if (FS.existsSync(targetFolder))
            await execute(`Removing @surface on ${$module.name}:`, `rmdir ${targetFolder}`);
    }    

    console.log('Unlinking done!');
}

async function relink()
{
    await unlink();
    await link();
}