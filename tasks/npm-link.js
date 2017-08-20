const Util = require('util');
const Path = require('path');

let exec = Util.promisify(require('child_process').exec);

let action = process.argv[2];

let modules =
[
    { name: 'common',               dependencies: [] },
    { name: 'html-template-plugin', dependencies: ['common'] },
    { name: 'compiler',             dependencies: ['common'] },
    { name: 'enumerable',           dependencies: ['common'] },
    { name: 'custom-element',       dependencies: ['common', 'enumerable'] },
];

let surfacePath = Path.resolve(__dirname, '../Surface/source/@surface');
let clientPath  = Path.resolve(__dirname, '../App.Client');

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

async function execute(label, command)
{
    try
    {
        const { stdout, stderr } = await exec(command);
        console.log(label, stdout);
        if (stderr)
            console.log(stderr, stderr);
    }
    catch(err)
    {
        console.log(err.message)
    }
}

async function link()
{
    for (let $module of modules)
    {
        for (let dependence of $module.dependencies)
            await execute(`Linking ${$module.name} dependence[${dependence}]:`, `cd ${surfacePath}\\${$module.name} & npm link @surface/${dependence}`);
        
        await execute(`Linking ${$module.name}:`, `cd ${surfacePath}\\${$module.name} & npm link`);

        await execute(`Linking ${$module.name} on client:`, `cd ${clientPath} & npm link @surface/${$module.name}`);
    }
}

async function unlink()
{
    for (let $module of modules.slice().reverse())
    {
        await execute(`Unlinking ${$module.name} on client:`, `cd ${clientPath} & npm unlink @surface/${$module.name}`);

        await execute(`Unlinking module ${$module.name}:`, `cd ${surfacePath}\\${$module.name} & npm unlink`);

        for (let dependence of $module.dependencies.slice().reverse())
            await execute(`Unlinking ${$module.name} dependence[${dependence}]:`, `cd ${surfacePath}\\${$module.name} & npm unlink @surface/${dependence}`);
    }
}

async function relink()
{
    await unlink();
    await link();
}