'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (error, request, response, next) {
  _logger2.default.log(_logger2.default.ERROR, '__ERROR_IN_MIDDLEWARE__');
  _logger2.default.log(_logger2.default.ERROR, error);

  if (error.status) {
    _logger2.default.log(_logger2.default.INFO, 'Responding with a ' + error.status + ' code and message ' + error.message);
    return response.sendStatus(error.status);
  }

  var errorMessage = error.message.toLowerCase();

  if (errorMessage.includes('objectid failed')) {
    _logger2.default.log(_logger2.default.INFO, 'Responding with a 404 code');
    return response.sendStatus(404);
  }

  if (errorMessage.includes('validation failed')) {
    _logger2.default.log(_logger2.default.INFO, 'Responding with a 400 code');
    return response.sendStatus(400);
  }

  if (errorMessage.includes('duplicate key')) {
    _logger2.default.log(_logger2.default.INFO, 'Responding with a 409 code');
    return response.sendStatus(409);
  }

  if (errorMessage.includes('unauthorized')) {
    _logger2.default.log(_logger2.default.INFO, 'Responding with a 401 code');
    return response.sendStatus(401);
  }

  _logger2.default.log(_logger2.default.ERROR, 'Responding with a 500 error code');
  _logger2.default.log(_logger2.default.ERROR, error);
  return response.sendStatus(500);
};