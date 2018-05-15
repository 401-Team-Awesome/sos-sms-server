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

var _account = require('../model/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
var client = new _twilio2.default(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
// import Message from '../model/message';


var jsonParser = _bodyParser2.default.json();
var messageRouter = new _express.Router();

messageRouter.post('/api/messages/:id', jsonParser, function (request, response, next) {
  _logger2.default.log(_logger2.default.INFO, 'MESSAGE-ROUTER POST: processing a request');
  console.log(request.body);
  if (!request.body.error) {
    _logger2.default.log(_logger2.default.INFO, 'MESSAGE-ROUTER POST: Error message required.');
    return next(new _httpErrors2.default(400, 'Error message required.'));
  }
  return _account2.default.findById(request.params.id).then(function (account) {
    console.log(request.params.id, 'params id in findbyid return');
    console.log(account, 'this is the account');
    console.log(account.userPhoneNumber);
    client.messages.create({
      body: request.body.error + ': ' + request.body.message,
      from: process.env.TWILIO_NUMBER,
      to: account.userPhoneNumber
    }).then(function (message) {
      return console.log(message.sid, 'this is the message.sid');
    }).done();
  }).then(console.log('message sent via twilio')).catch(next);
});

exports.default = messageRouter;