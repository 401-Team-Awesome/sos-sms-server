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
  user: {
    type: String,
    // required: true,
    unique: true
  },
  error: {
    type: Number,
    required: true
  },
  message: {
    type: String
  },
  account: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    required: true,
    ref: 'account'
  }
});

exports.default = _mongoose2.default.model('message', messageSchema);