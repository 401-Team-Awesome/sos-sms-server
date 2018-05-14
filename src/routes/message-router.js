'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpErrors from 'http-errors';
import logger from '../lib/logger';
import Message from '../model/message';

const jsonParser = bodyParser.json();
const messageRouter = new Router();

messageRouter.post('/api/messages', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'MESSAGE-ROUTER POST: processing a request');
  if (!request.body.user || !request.body.error || !request.body.account) {
    logger.log(logger.INFO, 'MESSAGE-ROUTER POST: User, Error, and Account are required.');
    return next(new HttpErrors(400, 'User, error, and account required.'));
  }
  return new Message(request.body).save()
    .then((message) => {
      logger.log(logger.INFO, 'MESSAGE-ROUTER POST: 200 status');
      return response.json(message);
    })
    .catch(next);
});

export default messageRouter;
