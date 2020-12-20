import fs                         from "fs";
import path                       from "path";
import { fileURLToPath }          from "url";
import Router                     from "@surface/router";
import WebHost, { Configuration } from "@surface/web-host";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const configuration = new Configuration(dirname, JSON.parse(fs.readFileSync("../server.config.json").toString()));

WebHost.configure(configuration)
    .useStatic()
    .useMvc
    (
        new Router()
            .map("api/{controller}/{action=index}/{id?}")
            .map("{controller}/{action=index}/{id?}"),
    )
    .useFallBack("/")
    .run();