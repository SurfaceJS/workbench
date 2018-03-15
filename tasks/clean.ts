import * as common from "./common";
import modules     from "./modules";
import paths       from "./paths";
import patterns    from "./patterns";

import path from "path";

for (let $module of modules)
{
    let source = path.normalize(path.join(paths.modules.source, $module.name));
    console.log(`Cleaning ${$module.name}`);
    common.cleanup(source, patterns.clean.include, patterns.clean.exclude);
}

console.log(`Cleaning server`);
common.cleanup(paths.server.source, patterns.clean.include, patterns.clean.exclude);
