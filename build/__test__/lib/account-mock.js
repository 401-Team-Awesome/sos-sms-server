// 'use strict';

// import faker from 'faker'; // eslint-disable-line
// import Account from '../../model/account';


// const pCreateAccountMock = () => {
//   console.log('inside createaccountmock');
//   return new Account({
//     // userPhoneNumber: '123456',
//     userPhoneNumber: process.env.PHONE_NUMBER,
//   }).save();
// };

// const pRemoveAccountMock = () => Account.remove({});

// export { pCreateAccountMock, pRemoveAccountMock };

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pCreateAccountMock = exports.pRemoveAccountMock = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _account = require('../../model/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pCreateAccountMock = function pCreateAccountMock() {
  var mock = {};

  mock.request = {
    username: _faker2.default.internet.userName(),
    email: _faker2.default.internet.email(),
    password: _faker2.default.lorem.words(5),
    userPhoneNumber: process.env.PHONE_NUMBER
  };
  return _account2.default.create(mock.request.username, mock.request.email, mock.request.password, mock.request.userPhoneNumber).then(function (account) {
    console.log('WERE in the AUTH CREATE FUNCTION', account);
    mock.account = account;
    return account.pCreateToken();
  }).then(function (token) {
    console.log(token, 'TOKEN MOCK ACCOUNT');
    mock.token = token;
    return _account2.default.findById(mock.account._id);
  }).then(function (account) {
    mock.account = account;
    console.log(mock, 'WHERE IS THE TOKEN MOCK ACCOUNT');
    return mock;
  });
};

var pRemoveAccountMock = function pRemoveAccountMock() {
  return _account2.default.remove({});
};

exports.pRemoveAccountMock = pRemoveAccountMock;
exports.pCreateAccountMock = pCreateAccountMock;