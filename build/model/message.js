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
  // user: {
  //   type: String,
  //   // required: true,
  //   unique: true,
  // },
  userphoneNumber: {
    type: String
  },
  error: {
    type: String
    // required: true,
  },
  // errorLocation: {
  //   type: String,
  // },
  message: {
    type: String
  },
  // response: {
  //   type: String,
  // },
  account: {
    type: _mongoose2.default.Schema.ObjectId,
    required: true
    // unique: true,
  },
  timeStamp: {
    type: Date,
    default: function _default() {
      return new Date();
    }
  }
});

exports.default = _mongoose2.default.model('message', messageSchema);