const fs    = require("fs");
const path  = require("path");
const paths = require("./paths");

let surface = path.join(paths.modules, "@surface");

let modules = fs.readdirSync(surface)
    .map(x => path.join(surface, x, "package.json"))
    .filter(x => fs.existsSync(x))
    .map(x => require(x));

module.exports = modules;