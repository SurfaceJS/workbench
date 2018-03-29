import path        from "path";
import * as common from "./common";
import packages    from "./packages";
import paths       from "./paths";
import patterns    from "./patterns";

let commands = [];

commands.push(common.execute(`Compiling server`, `tsc -p ${paths.server.root}`));

for (let $package of packages)
{
    let source = path.normalize(path.join(paths.modules.source, $package.name));
    common.cleanup(source, patterns.clean.include, patterns.clean.exclude);
    commands.push(common.execute(`Compiling ${$package.name}`, `tsc -p ${source}`));
}

Promise.all(commands).then(() => console.log("\nDone!"));