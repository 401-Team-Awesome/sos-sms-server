'use strict';

import { Router } from 'express';
import HttpError from 'http-errors';
import bodyParser from 'body-parser';

import Account from '../model/account';
import logger from '../lib/logger';
import basicAuthMiddleware from '../lib/basic-auth-middleware';


const jsonParser = bodyParser.json();
const authRouter = new Router();

authRouter.post('/signup', jsonParser, (request, response, next) => {
  return Account.create(request.body.username, request.body.email, request.username.password)
    .then((account) => {
      delete request.body.password;
      logger.log(logger.INFO, 'AUTH - creating TOKEN');
      return account.pCreateToken();
    })
    .then((token) => {
      logger.log(logger.INFO, 'AUTH - returning a 200 code and a token');
      return response.json({ token });
    })
    .catch(next);
});
authRouter.get('/login', basicAuthMiddleware, (request, response, next) => {
  if (!request.account) {
    return next(new HttpError(404, 'AUTH - no resource, now in auth-router'));
  }
  return request.account.pCreateToken()
    .then((token) => {
      logger.log(logger.INFO, 'LOGIN - AuthRouter responding with a 200 status and a Token');
      return response.json({ token });
    })
    .catch(next);
});

export default authRouter;
