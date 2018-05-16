'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const apiURL = `http://localhost:${process.env.PORT}`;
var apiURL = 'https://sos-sms.herokuapp.com';

exports.default = function (error, userID, message) {
  console.log(apiURL + '/api/messages/' + userID, 'url in sossms middleware');
  return _superagent2.default.post(apiURL + '/api/messages/' + userID).send({ error: error, message: message });
};