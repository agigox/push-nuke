import fetch from 'node-fetch';
import qs from 'qs';
import config from 'config';

import { retryWrapper } from './utils/helpers';
import { DefaultError } from './utils/errors';

const RTE_API_KEY = config.get('RTE_API_KEY');
const RTE_HOST = config.get('RTE_API');

export const DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';

export class RTEServiceError extends DefaultError {
  constructor(message, payload) {
    super(message, RTEServiceError.ERROR_CODE, payload);
  }

  static get ERROR_CODE() {
    return 'RTE_SERVICE_ERROR';
  }
}

const retryFetch = retryWrapper(fetch, {
  retryInterval: 1000,
  retryCount: 3,
  name: 'fetch',
});

export const fetchToken = async () => {
  const res = await retryFetch(`${RTE_HOST}/token/oauth/`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${RTE_API_KEY}`,
    },
  });
  const data = await res.json();

  return data.access_token;
};

async function getRessourceFn({ ressource, params = {}, token }) {
  const url = `${RTE_HOST}/open_api/${ressource}?${qs.stringify(params)}`;
  const res = await retryFetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const payload = {
      code: res.status,
      body: await res.text(),
    };
    throw new RTEServiceError('RTE Error', payload);
  }

  const data = await res.json();
  return data;
}

export const getRessource = retryWrapper(getRessourceFn, {
  retryCount: 3,
  retryInterval: 1000,
  name: 'rte.getRessource',
});
