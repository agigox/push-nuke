import enableDestroy from 'server-destroy';
import config from 'config';

import logger from './src/utils/logger.js';

import { normalizePort } from './src/utils/helpers';
import buildApi from './src/api';
import { fetchToken } from './src/rteApi';
import { initJobs, killJobs } from './src/jobs';
import esMain from 'es-main';

import _ from "lodash";
async function launchApp() {
  // When lunching the APP we get rte token
  const rteToken = await fetchToken();

  const environment = {
    logger,
    rteToken,
  };
  initJobs(environment);
  const app = buildApi(environment);

  const port = normalizePort(config.get('server.port'));
  const server = app.listen(port, () => {
    logger.info('Server is listening on', { port });
  });
  enableDestroy(server);

  server.on('close', () => {
    killJobs(environment);
    logger.info('Server closed');
  });

  process.on('SIGINT', () => server.close());
  process.on('SIGTERM', () => server.close());

  process.on('unhandledRejection', (reason, p) => {
    logger.error(`Unhandled Rejection at: ${p} reason: ${reason}`);
    server.close();
    process.exit(1);
  });

  return server;
}

if (esMain(import.meta)) {
  launchApp();
}
