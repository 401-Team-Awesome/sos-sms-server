'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pRemoveAccountMock = exports.pCreateAccountMock = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _account = require('../../model/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pCreateAccountMock = function pCreateAccountMock() {
  console.log('inside createaccountmock');
  return new _account2.default({
    // userPhoneNumber: '123456',
    userPhoneNumber: process.env.PHONE_NUMBER
  }).save();
}; // eslint-disable-line


var pRemoveAccountMock = function pRemoveAccountMock() {
  return _account2.default.remove({});
};

exports.pCreateAccountMock = pCreateAccountMock;
exports.pRemoveAccountMock = pRemoveAccountMock;