import * as common from "./common";
import modules     from "./modules";
import paths       from "./paths";
import patterns    from "./patterns";

import path from "path";

let commands = [];

commands.push(common.execute(`Compiling server`, `tsc -p ${paths.server.root}`));

for (let $module of modules)
{
    let source = path.normalize(path.join(paths.modules.source, $module.name));
    common.cleanup(source, patterns.clean.include, patterns.clean.exclude);
    commands.push(common.execute(`Compiling ${$module.name}`, `tsc -p ${source}`));
}

Promise.all(commands).then(() => console.log("\nDone!"));