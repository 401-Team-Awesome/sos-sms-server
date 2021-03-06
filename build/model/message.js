'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _account = require('../model/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line

var messageSchema = _mongoose2.default.Schema({
  userPhoneNumber: {
    type: String
  },
  error: {
    type: String
  },
  message: {
    type: String
  },
  account: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    required: true
  },
  timeStamp: {
    type: Date,
    default: function _default() {
      return new Date();
    }
  }
}); // eslint-disable-line
exports.default = _mongoose2.default.model('message', messageSchema);