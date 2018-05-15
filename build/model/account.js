'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var accountSchema = _mongoose2.default.Schema({
  userPhoneNumber: {
    type: String,
    required: true
    // unique: true,
  }
});

exports.default = _mongoose2.default.model('account', accountSchema);