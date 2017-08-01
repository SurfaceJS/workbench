"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
const FS = require("fs");
const ServerVariables = require("./server-variables");
function loadFile(response, path) {
    try {
        let extension = Path.extname(path);
        let data = FS.readFileSync(path);
        response.writeHead(200, { "Content-Type": ServerVariables.mymeType[extension] });
        response.write(data);
        response.end();
    }
    catch (error) {
        throw error;
    }
}
exports.loadFile = loadFile;
//# sourceMappingURL=utils.js.map