const FS   = require('fs');
const Path = require('path');

const modules = require('./modules');
const execute = require('./execute');

let action = process.argv[2];

let surface = Path.resolve(__dirname, '../Surface/source/@surface');
let client  = Path.resolve(__dirname, '../App.Client');

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
        for (let dependence of $module.dependencies)
        {
            let source = `${surface}\\${dependence}`;
            let target = `${surface}\\${$module.name}\\node_modules\\@surface`;

            if (!FS.existsSync(target))
                FS.mkdirSync(target);

            target += `\\${dependence}`;

            if (!FS.existsSync(target))
                await execute(`Linking ${$module.name} dependence[${dependence}]:`, `mklink /J ${target} ${source}`);
        }
    }
        
    if (!FS.existsSync(`${client}\\node_modules\\@surface`))
        await execute(`Linking @surface on client:`, `mklink /J ${client}\\node_modules\\@surface ${surface}`);

    console.log('done!');
}

async function unlink()
{
    for (let $module of modules.slice().reverse())
    {
        if (FS.existsSync(`${client}\\node_modules\\@surface`))
            await execute(`Unlinking @surface link on client:`, `rmdir ${client}\\node_modules\\@surface`);

        for (let dependence of $module.dependencies)
        {
            let targetFolder = `${surface}\\${$module.name}\\node_modules\\@surface`;
            let targetModule = `${targetFolder}\\${dependence}`;


            if (FS.existsSync(targetModule))
                await execute(`Unlinking ${$module.name} dependence[${dependence}]:`, `rmdir ${targetModule}`);

            await execute(`Removing @surface on ${$module.name}:`, `rmdir ${targetFolder}`);
        }
    }

    console.log('done!');
}

async function relink()
{
    await unlink();
    await link();
}