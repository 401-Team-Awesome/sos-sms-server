'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpError from 'http-errors';
import logger from '../lib/logger';
import Account from '../model/account';
import basicAuthMiddleware from '../lib/basic-auth-middleware';


const jsonParser = bodyParser.json();

const accountRouter = new Router();
// -------------------------old post route------------------------
// accountRouter.post('/api/accounts', jsonParser, (request, response, next) => {
//   console.log('inside router');
//   // if (!request.body.username || !request.body.userPhoneNumber) {
//   //   return next(new HttpErrors(400, 'userID and userPhoneNumber are required!'));
//   // }
//   return new Account(request.body).save()
//     .then((account) => {
//       logger.log(logger.INFO, 'ROUTER POST: 200');
//       return response.json(account);
//     })
//     .catch(next);
// });
// ------------------------old post route------------------------

accountRouter.post('/api/signup', jsonParser, (request, response, next) => {
  console.log('in signup route', request.body);
  return Account.create(request.body.username, request.body.email, request.body.password, request.body.userPhoneNumber)
    .then((account) => {
      console.log('we got the account', account);
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

accountRouter.get('/api/login', basicAuthMiddleware, (request, response, next) => {
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

export default accountRouter;
