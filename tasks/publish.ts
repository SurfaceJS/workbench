import * as common from "./common";
import modules     from "./modules";
import paths       from "./paths";
import patterns    from "./patterns";

import fs   from "fs";
import path from "path";

type Package =
{
    dependencies: Array<Object>,
    name:         string,
    version:      string
};

async function run()
{
    let token = fs.readFileSync(path.normalize(`${process.env.USERPROFILE}/.npmrc`)).toString().replace("\n", "");

    let versionsFile = path.resolve(__dirname, "./versions.json");

    let versions: { [key: string]: string } = { };

    if (fs.existsSync(versionsFile))
    {
        versions = require(versionsFile);
    }

    let toPublish: Array<Package> = [];

    modules.forEach(checkVersion);
    toPublish.forEach(checkDependencies);


    for (let $module of toPublish)
    {
        let source = path.normalize(path.join(paths.modules.source, $module.name));

        fs.writeFileSync(path.resolve(source, "package.json"), JSON.stringify($module, null, 4));

        common.cleanup(source, patterns.clean.include, patterns.clean.exclude);
        await common.execute(`Compiling ${source}`, `tsc -p ${source} --noEmit false --declaration true`);

        await common.execute(`Publishing ${$module.name}:`, `npm set ${token} & cd ${source} && npm publish --access public`);
    }

    if (toPublish.length > 0) {
        fs.writeFileSync(versionsFile, JSON.stringify(versions, null, 4));
    }

    function checkVersion($module: Package)
    {
        if(!versions[$module.name])
        {
            versions[$module.name] = $module.version;
            toPublish.push($module);
        }

        if(isUpdated($module))
        {
            toPublish.push($module);
            versions[$module.name] = $module.version;
        }
    }

    function checkDependencies($module: Package)
    {
        for(let dependee of modules.filter(x => x.dependencies && !!x.dependencies[$module.name]))
        {
            if(toPublish.findIndex(x => x.name == dependee.name && x.dependencies[$module.name] == $module.version) == -1)
            {
                dependee.dependencies[$module.name] = $module.version;

                if (toPublish.findIndex(x => x.name == dependee.name) == -1)
                {
                    updateVersion(dependee);

                    versions[dependee.name] = dependee.version;

                    toPublish.push(dependee);
                }

                checkDependencies(dependee);
            }
        }
    }

    function isUpdated($module: Package)
    {
        let [targetMajor, targetMinor, targetRevision] = $module.version.split(".").map(x => Number.parseInt(x));
        let [storedMajor, storedMinor, storedRevision]  = versions[$module.name].split(".").map(x => Number.parseInt(x));

        return (targetMajor > storedMajor)
            || (targetMajor == storedMajor && targetMinor  > storedMinor)
            || (targetMajor == storedMajor && targetMinor == storedMinor && targetRevision > storedRevision);
    }

    function updateVersion($module: Package)
    {
        let [major, minor, revision] = $module.version.split(".").map(x => Number.parseInt(x));

        revision++;

        $module.version = [major, minor, revision].join(".");
    }
}

run();