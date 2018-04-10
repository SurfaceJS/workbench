import fs          from "fs";
import path        from "path";
import * as common from "./common";
import packages    from "./packages";
import paths       from "./paths";

let action = process.argv[2];

let targets =
[
    { name: "Client", path: path.resolve(paths.client.root, "node_modules", "@surface") },
    { name: "Server", path: path.resolve(paths.server.root, "node_modules", "@surface") },
];

if (action == "l" || action == "link")
{
    link();
}
else if (action == "u" || action == "unlink")
{
    unlink();
}
else if (action == "r" || action == "relink")
{
    relink();
}

async function link()
{
    for (let $package of packages)
    {
        for (let dependence of common.objectToDictionary({ ...$package.dependencies, ...$package.devDependencies }).filter(x => x.key.startsWith("@surface/")))
        {
            let source = path.normalize(path.join(paths.modules.source, dependence.key));
            let target = path.normalize(path.join(paths.modules.source, $package.name, "node_modules"));

            common.makePath(path.join(target, "@surface"));

            target = path.normalize(path.join(target, dependence.key));

            if (!fs.existsSync(target))
            {
                await common.execute(`Linking ${$package.name} dependence[${dependence.key}]:`, `mklink /J ${target} ${source}`);
            }
        }
    }

    for (let target of targets)
    {
        let nodeModules = path.resolve(target.path, "../");

        common.makePath(nodeModules);

        if (!fs.existsSync(target.path))
        {
            await common.execute(`Linking @surface on ${target.name}:`, `mklink /J ${target.path} ${path.join(paths.modules.source, "@surface")}`);
        }
    }

    console.log("Linking done!");
}

async function unlink()
{
    for (let $package of packages)
    {
        let targetFolder = path.normalize(path.join(paths.modules.source, $package.name, "node_modules", "@surface"));

        if (fs.existsSync(targetFolder))
        {
            await common.execute(`Removing @surface on ${$package.name}:`, `rmdir /s /q ${targetFolder}`);
        }
    }

    for (let target of targets)
    {
        if (fs.existsSync(target.path))
        {
            await common.execute(`Unlinking @surface link on ${target.name}:`, `rmdir /s /q ${target.path}`);
        }
    }

    console.log("Unlinking done!");
}

async function relink()
{
    await unlink();
    await link();
}