import Router                     from "@surface/router";
import WebHost, { Configuration } from "@surface/web-host";

const configuration = new Configuration(__dirname, require("../server.config.json"));

WebHost.configure(configuration)
    .useStatic()
    .useMvc
    (
        new Router()
            .map("api/{controller}/{action=index}/{id?}")
            .map("{controller}/{action=index}/{id?}")
    )
    .useFallBack("/")
    .run();