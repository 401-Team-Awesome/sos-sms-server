'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiURL = 'http://localhost:' + process.env.PORT;
// const apiURL = 'https://sos-sms.herokuapp.com';

exports.default = function (error, userID, message) {
  return _superagent2.default.post(apiURL + '/api/messages/' + userID).send({ error: error, message: message }).then(function (data) {
    return data;
  }).catch(error);
};