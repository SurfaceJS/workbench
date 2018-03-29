import fs          from "fs";
import path        from "path";
import * as common from "./common";
import IPackage    from "./interfaces/package";
import packages    from "./packages";
import paths       from "./paths";
import patterns    from "./patterns";

async function run()
{
    let token = fs.readFileSync(path.normalize(`${process.env.USERPROFILE}/.npmrc`)).toString().replace("\n", "");

    let versionsFile = path.resolve(__dirname, "./versions.json");

    let versions: { [key: string]: string } = { };

    if (fs.existsSync(versionsFile))
    {
        versions = require(versionsFile);
    }

    let toPublish: Array<IPackage> = [];

    packages.forEach(checkVersion);
    toPublish.forEach(checkDependencies);


    for (let $package of toPublish)
    {
        let source = path.normalize(path.join(paths.modules.source, $package.name));

        fs.writeFileSync(path.resolve(source, "package.json"), JSON.stringify($package, null, 4));

        common.cleanup(source, patterns.clean.include, patterns.clean.exclude);
        await common.execute(`Compiling ${source}`, `tsc -p ${source} --noEmit false --declaration true`);

        await common.execute(`Publishing ${$package.name}:`, `npm set ${token} & cd ${source} && npm publish --access public`);
    }

    if (toPublish.length > 0) {
        fs.writeFileSync(versionsFile, JSON.stringify(versions, null, 4));
    }

    function checkVersion($package: IPackage)
    {
        if(!versions[$package.name])
        {
            versions[$package.name] = $package.version;
            toPublish.push($package);
        }

        if(isUpdated($package))
        {
            toPublish.push($package);
            versions[$package.name] = $package.version;
        }
    }

    function checkDependencies($package: IPackage)
    {
        for(let dependee of packages.filter(x => x.dependencies && !!x.dependencies[$package.name]))
        {
            if(toPublish.findIndex(x => x.name == dependee.name && x.dependencies[$package.name] == $package.version) == -1)
            {
                dependee.dependencies[$package.name] = $package.version;

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

    function isUpdated($package: IPackage)
    {
        let [targetMajor, targetMinor, targetRevision] = $package.version.split(".").map(x => Number.parseInt(x));
        let [storedMajor, storedMinor, storedRevision]  = versions[$package.name].split(".").map(x => Number.parseInt(x));

        return (targetMajor > storedMajor)
            || (targetMajor == storedMajor && targetMinor  > storedMinor)
            || (targetMajor == storedMajor && targetMinor == storedMinor && targetRevision > storedRevision);
    }

    function updateVersion($package: IPackage)
    {
        let [major, minor, revision] = $package.version.split(".").map(x => Number.parseInt(x));

        revision++;

        $package.version = [major, minor, revision].join(".");
    }
}

run();