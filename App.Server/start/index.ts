import { Configuration } from './types';

import HTTP  = require('http');
import Path  = require('path');
import Utils = require('./content/utils');

const ROOT = Path.resolve(__dirname, '../')

let config = require('../server.config.json') as Configuration;

config.defaultRoute = config.defaultRoute || '/';
config.notFound     = config.notFound     || '/not-found';
config.wwwRoot      = Path.resolve(ROOT, config.wwwRoot);

HTTP.createServer
(
    (request, response) =>
    {
        try
        {
            if (request.url)
            {
                let path = Utils.resolveUrl(config.wwwRoot, request.url, config.defaultRoute!);

                path = path || config.notFound || '';
                Utils.loadFile(response, path);
            }
        }
        catch (error)
        {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end(error.message);
        }
    }
)
.listen(config.port);