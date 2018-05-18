'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpError from 'http-errors';
import logger from '../lib/logger';
import Account from '../model/account';
import basicAuthMiddleware from '../lib/basic-auth-middleware';


const jsonParser = bodyParser.json();

const accountRouter = new Router();

accountRouter.post('/api/signup', jsonParser, (request, response, next) => {
  let userId = null;
  return Account.create(request.body.username, request.body.email, request.body.password, request.body.userPhoneNumber) // eslint-disable-line
    .then((account) => {
      delete request.body.password;
      userId = account._id;
      logger.log(logger.INFO, 'AUTH - creating TOKEN');
      return account.pCreateToken();
    })
    .then((token) => {
      logger.log(logger.INFO, 'AUTH - returning a 200 code and a token');
      return response.json({
        token,
        _id: userId,
      });
    })
    .catch(next);
});

accountRouter.get('/api/login', basicAuthMiddleware, (request, response, next) => {
  if (!request.account) {
    return next(new HttpError(404, 'AUTH - no resource, now in auth-router'));
  }
  const userId = request.account._id;
  return request.account.pCreateToken()
    .then((token) => {
      logger.log(logger.INFO, 'LOGIN - AuthRouter responding with a 200 status and a Token');
      return response.json({ 
        token,
        _id: userId,
      });
    })
    .catch(next);
});

export default accountRouter;
