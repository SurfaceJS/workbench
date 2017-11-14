import { WebHost }       from '@surface/web-host';
import { Configuration } from '@surface/web-host/configuration';

const config = new Configuration(__dirname, require('../server.config.json'));

WebHost.create(config).run();