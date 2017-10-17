import HTTP  = require("http");
import Path  = require("path");
import Utils = require("./content/utils");

const PORT    = process.env.port || "1337"
const ROOT    = Path.resolve(__dirname, "../");
const PUBLIC  = Path.join(ROOT, "public");
const DEFAULT = Path.join(PUBLIC, "./app");

HTTP.createServer
(
    (request, response) =>
    {
        try
        {
            if (request.url)
            {
                Utils.loadFile(response, Utils.resolveUrl(PUBLIC, DEFAULT, request.url));
            }
        }
        catch (error)
        {
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.end(error.message);
        }
    }
)
.listen(PORT);