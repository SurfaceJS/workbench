import { Router }        from "@surface/router";
import { WebHost }       from "@surface/web-host";
import { Configuration } from "@surface/web-host/configuration";

const configuration = new Configuration(__dirname, require("../server.config.json"));

WebHost.configure(configuration)
    .useStatic()
    .useMvc
    (
        new Router()
            .mapRoute("api", "api/{controller}/{action=index}/{id?}")
            .mapRoute("default", "{controller}/{action=index}/{id?}", true)
    )
    .useFallBack("/app")
    .run();