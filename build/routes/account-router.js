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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsonParser = _bodyParser2.default.json();

var accountRouter = new _express.Router();

accountRouter.post('/api/accounts', jsonParser, function (request, response, next) {
  if (!request.body.userID || !request.body.userPhoneNumber) {
    return next(new _httpErrors2.default(400, 'userID and userPhoneNumber are required!'));
  }
  return new _account2.default(request.body).save().then(function (account) {
    _logger2.default.log(_logger2.default.INFO, 'ROUTER POST: 200');
    return response.json(account);
  }).catch(next);
});

exports.default = accountRouter;