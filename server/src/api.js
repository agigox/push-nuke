import config from 'config';
import express from 'express';

// middlewares
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

import _ from 'lodash';
import { referentiel, pmax, bilan, bilan1 } from './data';
import { RTEServiceError } from './rteApi';

import {
  errorHandlerMiddleware,
  logRequestMiddleware,
  addRequestIdMiddleware,
  notFoundMiddleware,
} from './utils/middlewares';

import { getData } from './services';

function serviceWrapper(service, environment) {
  return async function wrappedService(req, res, next) {
    try {
      const data = await service(req.query, environment);
      res.json(data);
    } catch (err) {
      if (err instanceof RTEServiceError) {
        res.statusCode = 500;
        res.json(err.toObject());
        return;
      }

      next(err);
    }
  };
}
export const groupByKey = (array, key) =>
  _.chain(array)
    // Group the elements of Array based on `key` property
    .groupBy(key)
    // `key` is group's name (color), `value` is the array of objects
    .map((value, mapKey) => ({ key: mapKey, values: value }))
    .value();
const buildApi = (environment) => {
  const app = express();
  const { logger } = environment;

  app.use(addRequestIdMiddleware());
  app.use(logRequestMiddleware(logger));
  app.use(helmet());
  app.use(compression());
  app.use(cors(config.get('api.cors')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/data', serviceWrapper(getData, environment));
  app.get('/pmax', (req, res) => {
    res.json(pmax);
  });
  app.get('/bilan', (req, res) => {
    res.json({
      length: bilan.length,
      items: bilan,
    });
  });
  app.get('/bilan1', (req, res) => {
    // console.log(groupByKey(bilan1, 'RegroupementHydro'));
    res.json(bilan1);
  });

  if (process.env.NODE_ENV !== 'production') {
    app.get('/token', (req, res) => {
      res.json({ token: environment.rteToken });
    });
  }

  app.get('/_status', (req, res) => {
    res.json({ status: 'OK' });
  });
  app.get('/referentiel', (req, res) => {
    res.json(referentiel);
  });

  app.use(notFoundMiddleware());
  app.use(errorHandlerMiddleware(logger));

  return app;
};

export default buildApi;
