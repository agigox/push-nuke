import { fetchToken } from '../rteApi';

async function updateRteToken(environment) {
  const { logger } = environment;

  logger.info('Renew token');
  const newToken = await fetchToken().catch((err) => {
    logger.error('Error in renewing token', err);
  });

  // eslint-disable-next-line no-param-reassign
  environment.rteToken = newToken;
}

const updates = {
  f: updateRteToken,
  interval: 10 * 60 * 1000, // update token every 10 min
};
export default updates;
