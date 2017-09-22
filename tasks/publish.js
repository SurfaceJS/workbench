const FS   = require('fs');
const Path = require('path');

const modules = require('./modules');
const Common  = require('./common');

async function run()
{
    let token = FS.readFileSync(Path.normalize(`${process.env.USERPROFILE}/.npmrc`)).toString().replace('\n', '');

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
            versions[$module.name] = $module.version;
        }
    }
    
    const root = Path.resolve(__dirname, '../Surface/source');
    
    for (let $module of toPublish)
    {
        let source = Path.normalize(Path.join(root, $module));
        Common.cleanup(source, /\.(js(\.map)?|d\.ts)$/, /@types|node_modules/);
        await Common.execute(`Compiling ${source}`, `tsc -p ${source} --noEmit false --declaration true`);

        await Common.execute(`Publishing ${$module}:`, `npm set ${token} & cd ${source} && npm publish --access public`);
    }
    
    if (toPublish.length > 0)
        FS.writeFileSync('./versions.json', JSON.stringify(versions));
}

run();