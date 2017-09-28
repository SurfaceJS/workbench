const FS       = require('fs');
const Path     = require('path');
const Common   = require('./common');
const modules  = require('./modules');
const patterns = require('./patterns');

async function run()
{
    let token = FS.readFileSync(Path.normalize(`${process.env.USERPROFILE}/.npmrc`)).toString().replace('\n', '');


    let versionsFile = Path.resolve(__dirname, './versions.json')

    let versions = { };


    
    if (FS.existsSync(versionsFile))
        versions = require(versionsFile);
    
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
        Common.cleanup(source, patterns.clean.include, patterns.clean.exclude);
        await Common.execute(`Compiling ${source}`, `tsc -p ${source} --noEmit false --declaration true`);

        await Common.execute(`Publishing ${$module}:`, `npm set ${token} & cd ${source} && npm publish --access public`);
    }
    
    if (toPublish.length > 0)
        FS.writeFileSync(versionsFile, JSON.stringify(versions, null, 4));
}

run();