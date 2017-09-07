const FS   = require('fs');
const Path = require('path');

let surface = Path.resolve(__dirname, '../Surface/source/@surface');

let modules = FS.readdirSync(surface).map(x => require(Path.join(surface, x, 'package.json')));

module.exports = modules;