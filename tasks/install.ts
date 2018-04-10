import path        from "path";
import * as common from "./common";
import packages    from "./packages";
import paths       from "./paths";

const fullInstall = !!process.argv[2];

let commands = [];

for (let $module of packages)
{
    const source = path.normalize(path.join(paths.modules.source, $module.name));

    const $package = require(path.join(source, "package.json"));

    let dependencies = { ...$package.dependencies, ...$package.devDependencies };

    let targets = Object.keys(dependencies)
        .filter(x => !x.startsWith("@surface/") || fullInstall)
        .map(key => `${key}@${dependencies[key].replace(/^(\^|\~)/, "")}`)
        .join(" ");

    if (targets)
    {
        commands.push(common.execute(`Installing ${$module.name} dependencies.`, `cd ${source} && npm install ${targets} --save-exact`));
    }
}

for (let targetPath of [paths.client, paths.server])
{
    const $package = require(targetPath.package);

    let dependencies = { ...$package.dependencies, ...$package.devDependencies };

    let targets = Object.keys(dependencies)
        .filter(x => !x.startsWith("@surface/") || fullInstall)
        .map(key => `${key}@${dependencies[key]}`)
        .join(" ");

    if (targets)
    {
        commands.push(common.execute(`Installing ${path.parse(path.resolve(targetPath.root, "../")).name} dependencies.`, `cd ${targetPath.root} && npm install ${targets} --save-exact`));
    }
}

Promise.all(commands).then(() =>console.log("\nDone!"));