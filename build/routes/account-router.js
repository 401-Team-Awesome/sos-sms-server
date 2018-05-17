'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _logger = require('../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _account = require('../model/account');

var _account2 = _interopRequireDefault(_account);

var _basicAuthMiddleware = require('../lib/basic-auth-middleware');

var _basicAuthMiddleware2 = _interopRequireDefault(_basicAuthMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsonParser = _bodyParser2.default.json();

var accountRouter = new _express.Router();
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

accountRouter.post('/api/signup', jsonParser, function (request, response, next) {
  console.log('in signup route', request.body);
  return _account2.default.create(request.body.username, request.body.email, request.body.password, request.body.userPhoneNumber).then(function (account) {
    console.log('we got the account', account);
    delete request.body.password;
    _logger2.default.log(_logger2.default.INFO, 'AUTH - creating TOKEN');
    return account.pCreateToken();
  }).then(function (token) {
    _logger2.default.log(_logger2.default.INFO, 'AUTH - returning a 200 code and a token');
    return response.json({ token: token });
  }).catch(next);
});

accountRouter.get('/api/login', _basicAuthMiddleware2.default, function (request, response, next) {
  if (!request.account) {
    return next(new _httpErrors2.default(404, 'AUTH - no resource, now in auth-router'));
  }
  return request.account.pCreateToken().then(function (token) {
    _logger2.default.log(_logger2.default.INFO, 'LOGIN - AuthRouter responding with a 200 status and a Token');
    return response.json({ token: token });
  }).catch(next);
});

exports.default = accountRouter;