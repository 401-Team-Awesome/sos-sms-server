'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _twilio = require('twilio');

var _twilio2 = _interopRequireDefault(_twilio);

var _logger = require('../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _message = require('../model/message');

var _message2 = _interopRequireDefault(_message);

var _account = require('../model/account');

var _account2 = _interopRequireDefault(_account);

var _bearerAuthMiddleware = require('../lib/bearer-auth-middleware');

var _bearerAuthMiddleware2 = _interopRequireDefault(_bearerAuthMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = new _twilio2.default(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

var jsonParser = _bodyParser2.default.json();
var messageRouter = new _express.Router();

messageRouter.post('/api/messages/:id', jsonParser, function (request, response, next) {
  _logger2.default.log(_logger2.default.INFO, 'MESSAGE-ROUTER POST: processing a request');
  if (!request.body.error) {
    _logger2.default.log(_logger2.default.INFO, 'MESSAGE-ROUTER POST: Error message required.');
    return next(new _httpErrors2.default(400, 'Error message required.'));
  }
  return _account2.default.findById(request.params.id).then(function (account) {
    console.log(account, 'this is the account');
    return new _message2.default({
      userPhoneNumber: account.userPhoneNumber,
      account: account._id,
      error: request.body.error,
      message: request.body.message
    }).save().then(function (message) {
      console.log(message, 'this is the message');
      client.messages.create({
        body: request.body.error + ': ' + request.body.message,
        from: process.env.TWILIO_NUMBER,
        to: message.userPhoneNumber
      }).then(function (twilioMessage) {
        console.log(twilioMessage.sid);
      }).done();
    }).catch(function (err) {
      console.log(err);
    });
  }).then(function (messageResponse) {
    return response.json(messageResponse);
  }).catch(next);
});

messageRouter.get('/api/messages/:id', _bearerAuthMiddleware2.default, function (request, response, next) {
  return _message2.default.findById(request.params.id).then(function (message) {
    _logger2.default.log(_logger2.default.INFO, 'MESSAGE ROUTER: responding with a 200 status code');
    _logger2.default.log(_logger2.default.INFO, 'MESSAGE ROUTER: ' + JSON.stringify(message));
    return response.json(message);
  }).catch(next);
});

exports.default = messageRouter;