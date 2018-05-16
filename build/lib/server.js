'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopServer = exports.startServer = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _errorMiddleware = require('./error-middleware');

var _errorMiddleware2 = _interopRequireDefault(_errorMiddleware);

var _messageRouter = require('../routes/message-router');

var _messageRouter2 = _interopRequireDefault(_messageRouter);

var _accountRouter = require('../routes/account-router');

var _accountRouter2 = _interopRequireDefault(_accountRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = null;

app.use(_messageRouter2.default);
app.use(_accountRouter2.default);

app.all('*', function (request, response) {
  _logger2.default.log(_logger2.default.INFO, 'Returning a 404 from the catch-all/default route');
  return response.sendStatus(404);
});

app.use(_errorMiddleware2.default);

var startServer = function startServer() {
  return _mongoose2.default.connect(process.env.MONGODB_URI).then(function () {
    server = app.listen(process.env.PORT, function () {
      _logger2.default.log(_logger2.default.INFO, 'Server is listening on port ' + process.env.PORT + '------------------------------------');
    });
  }).catch(function (err) {
    _logger2.default.log(_logger2.default.ERROR, 'something happened in server, ' + JSON.stringify(err));
  });
};

var stopServer = function stopServer() {
  return _mongoose2.default.disconnect().then(function () {
    server.close(function () {
      _logger2.default.log(_logger2.default.INFO, 'Server is off------------------------------------');
    });
  });
};

exports.startServer = startServer;
exports.stopServer = stopServer;