import { WebHost }       from '@surface/web-host';
import { Configuration } from '@surface/web-host/configuration';
import { Router }        from '@surface/router';

const configuration = new Configuration(__dirname, require('../server.config.json'));

WebHost.create(configuration)
    .useStatic()
    .useMvc
    (
        Router.create()
            .mapRoute('default', '{controller}/{action=index}/{id?}', true)
            .mapRoute('api', 'api/{controller}/{action=index}/{id?}')
    )
    .useFallBack('/app')
    .run();