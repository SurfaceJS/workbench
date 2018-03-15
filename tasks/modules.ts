import fs    from "fs";
import path  from "path";
import paths from "./paths";

let surface = path.join(paths.modules.source, "@surface");

export default fs.readdirSync(surface)
    .map(x => path.join(surface, x, "package.json"))
    .filter(x => fs.existsSync(x))
    .map(require);