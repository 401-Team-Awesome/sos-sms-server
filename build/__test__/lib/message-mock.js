'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pRemoveMessageMock = exports.pCreateMessageMock = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _accountMock = require('./account-mock');

var _message = require('../../model/message');

var _message2 = _interopRequireDefault(_message);

var _account = require('../../model/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Double check there are no 'sound' mocks. writing this following along in class.

var pCreateMessageMock = function pCreateMessageMock() {
  var resultMock = {};
  return (0, _accountMock.pCreateAccountMock)().then(function (mockAcctResponse) {
    resultMock.accountMock = mockAcctResponse;

    return new _message2.default({
      account: resultMock.accountMock.account._id,
      message: _faker2.default.lorem.words(2),
      error: _faker2.default.lorem.word
    }).save();
  }).then(function (message) {
    resultMock.message = message;
    return resultMock;
  });
};

var pRemoveMessageMock = function pRemoveMessageMock() {
  return Promise.all([_account2.default.remove({}), _message2.default.remove({})]);
};

exports.pCreateMessageMock = pCreateMessageMock;
exports.pRemoveMessageMock = pRemoveMessageMock;