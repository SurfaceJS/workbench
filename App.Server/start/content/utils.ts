import HTTP            = require('http');
import Path            = require('path');
import FS              = require('fs');
import ServerVariables = require('./server-variables');

export function loadFile(response: HTTP.ServerResponse, path: string): void
{
    try
    {
        let extension = Path.extname(path);
        let data      = FS.readFileSync(path);

        response.writeHead(200, { "Content-Type": ServerVariables.mymeType[extension] });
        response.write(data);
        response.end();
    }
    catch (error)
    {
        throw error;
    }
}

export function resolveUrl(root: string, defaultRoute: string, url: string): string
{
    url = url.replace(/^\//, "") || 'index.html';

    let targets =
    [
        Path.resolve(root, url),
        Path.resolve(root, url, 'index.html'),
        Path.resolve(root, url, 'default.html'),
        Path.resolve(root, url + '.html'),
        Path.resolve(defaultRoute, url),
        Path.resolve(defaultRoute, url, 'index.html'),
        Path.resolve(defaultRoute, url, 'default.html'),
        Path.resolve(defaultRoute, url + '.html'),
    ]

    return targets.filter(x => FS.existsSync(x) && FS.lstatSync(x).isFile())[0];
}