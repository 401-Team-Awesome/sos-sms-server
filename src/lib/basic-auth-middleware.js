'use strict';

import HttpError from 'http-errors';
import Account from '../model/account';

export default (request, response, next) => {
  if (!request.headers.authorization) {
    return next(new HttpError(400, 'AUTH BASIC - no header invalid request!'));
  }

  const base64AuthHeader = request.headers.authorization.split('Basic ')[1];
  if (!base64AuthHeader) {
    return next(new HttpError(400, 'AUTH BASIC - header no split invalid request'));
  }
  const stringAuthHeader = Buffer.from(base64AuthHeader, 'base64').toString();
  
  const [username, password] = stringAuthHeader.split(':');
  if (!username || !password) {
    return next(new Error(400, 'AUTH BASIC - no user or password invalid request'));
  }
  
  return Account.findOne({ username })
    .then((account) => {
      if (!account) {
        return next(new HttpError(404, 'no such account'));
      }
      return account.pVerifyPassword(password);
    })
    .then((account) => {
      request.account = account; 
      return next(); 
    })
    .catch(next);
};
