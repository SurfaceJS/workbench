import path        from "path";
import * as common from "./common";
import modules     from "./modules";
import paths       from "./paths";

const fullInstall = !!process.argv[2];

let commands = [];

for (let $module of modules)
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
        commands.push(common.execute(`${$module.name} dependencies installed.`, `cd ${source} && npm install ${targets} --save-exact`));
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
        commands.push(common.execute(`${path.parse(path.resolve(targetPath.root, "../")).name} dependencies installed.`, `cd ${targetPath.root} && npm install ${targets} --save-exact`));
    }
}

Promise.all(commands).then(() =>console.log("\nDone!"));