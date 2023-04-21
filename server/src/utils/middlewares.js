import { v4 as uuidv4 } from 'uuid';
import onFinished from 'on-finished';
import onHeaders from 'on-headers';
import { omit } from 'ramda';

import { DomainError, ValidationError } from './errors';

export const addRequestIdMiddleware = () =>
  function addRequestId(req, res, next) {
    req.requestId = uuidv4();
    next();
  };

export const errorHandlerMiddleware = (logger) => {
  const BAD_JSON = 'BAD_JSON';
  return function errorHandler(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      res.statusCode = 400;
      res.json({
        error: {
          message: err.message,
          errorCode: BAD_JSON,
          payload: null,
        },
      });
    } else if (err instanceof DomainError || err instanceof ValidationError) {
      res.statusCode = 400;
      res.json({ error: err.toObject() });
    } else {
      logger.error(err.stack, { requestId: req.requestId });
      res.statusCode = 500;
      res.json({ error: `${req.requestId}` });
    }

    return next();
  };
};

export const logRequestMiddleware = (logger) =>
  function logRequest(req, res, next) {
    const startTime = Date.now();
    let responseTime;
    onHeaders(res, () => {
      responseTime = Date.now() - startTime;
    });
    onFinished(res, () => {
      const message = `${res.statusCode} ${req.method} ${req.originalUrl}`;
      const data = {
        requestId: req.requestId,
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        headers: omit(['cookie', 'authorization'], req.headers),
        responseTime,
      };
      if (res.statusCode === 500) {
        logger.error(message, data);
      } else {
        logger.info(message, data);
      }
    });
    next();
  };

export const notFoundMiddleware = () =>
  function notFound(req, res) {
    if (!res.headersSent) {
      res.status(404).json({
        error: `${req.method} ${req.originalUrl}: Not found`,
      });
    }
  };
