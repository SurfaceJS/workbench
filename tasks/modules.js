const fs    = require('fs');
const path  = require('path');
const paths = require('./paths');

let surface = path.join(paths.modules, '@surface');

let modules = fs.readdirSync(surface).map(x => require(path.join(surface, x, 'package.json')));

module.exports = modules;