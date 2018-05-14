'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpErrors from 'http-errors';
import logger from '../lib/logger';
import Account from '../model/account';

const jsonParser = bodyParser.json();

const accountRouter = new Router();

accountRouter.post('/api/accounts', jsonParser, (request, response, next) => {
  if (!request.body.userID || !request.body.userPhoneNumber) {
    return next(new HttpErrors(400, 'userID and userPhoneNumber are required!'));
  }
  return new Account(request.body).save()
    .then((account) => {
      logger.log(logger.INFO, 'ROUTER POST: 200');
      return response.json(account);
    })
    .catch(next);
});

export default accountRouter;
