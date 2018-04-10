import path        from "path";
import * as common from "./common";
import packages    from "./packages";
import paths       from "./paths";
import patterns    from "./patterns";

for (let $package of packages)
{
    let source = path.normalize(path.join(paths.modules.source, $package.name));
    console.log(`Cleaning ${$package.name}`);
    common.cleanup(source, patterns.clean.include, patterns.clean.exclude);
}

console.log(`Cleaning server`);
common.cleanup(paths.server.source, patterns.clean.include, patterns.clean.exclude);
