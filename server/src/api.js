import config from 'config';
import express from 'express';

// middlewares
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

import { referentiel, pmax, bilan } from './data';
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
    res.json({
      length: pmax.length,
      items: pmax,
    });
  });
  app.get('/bilan', (req, res) => {
    res.json({
      length: bilan.length,
      items: bilan,
    });
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
    res.json({
      length: referentiel.length,
      items: referentiel,
    });
  });

  app.use(notFoundMiddleware());
  app.use(errorHandlerMiddleware(logger));

  return app;
};

export default buildApi;
