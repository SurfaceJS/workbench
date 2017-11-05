import serverConfig      from '../server.config.json';
import { WebHost }       from '@surface/web-host';
import { Configuration } from '@surface/web-host/configuration';

const config = new Configuration(__dirname, serverConfig);

WebHost.create(config).run();