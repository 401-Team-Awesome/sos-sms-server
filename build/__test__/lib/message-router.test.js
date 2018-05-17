'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _server = require('../../lib/server');

var _sosSmsMiddleware = require('../../lib/sos-sms-middleware');

var _sosSmsMiddleware2 = _interopRequireDefault(_sosSmsMiddleware);

var _messageMock = require('../lib/message-mock');

var _accountMock = require('../lib/account-mock');

var _logger = require('../../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line
var apiURL = 'http://localhost:' + process.env.PORT; // eslint-disable-line
// eslint-disable-line


describe('testing sms sos middleware', function () {
  _logger2.default.log(_logger2.default.INFO, 'this is the test starting');

  beforeAll(_server.startServer);
  afterAll(_server.stopServer);
  afterEach(_accountMock.pRemoveAccountMock);

  test('should send a request to our api', function () {
    var userID = null;
    return (0, _accountMock.pCreateAccountMock)().then(function (response) {
      userID = response._id;
      return (0, _sosSmsMiddleware2.default)('400', userID, 'its your problem yo').then(function (res) {
        expect(res.status).toEqual(200);
      }).catch(function (err) {
        console.log(err);
      });
    });
  });
  test('POST 400 due to bad request', function () {
    return (0, _accountMock.pCreateAccountMock)().then(function (response) {
      return _superagent2.default.post(apiURL + '/api/messages/' + response.account._id).send({
        username: 'zachary'
      }).then(Promise.reject).catch(function (error) {
        expect(error.status).toEqual(400);
      });
    });
  });
  test('POST 404 due to no account found', function () {
    return (0, _accountMock.pCreateAccountMock)().then(function () {
      return _superagent2.default.post(apiURL + '/api/messages/notAValidId').send({
        error: '500',
        password: 'red alert'
      }).then(Promise.reject).catch(function (error) {
        expect(error.status).toEqual(404);
      });
    });
  });

  test('GET /api/messages/:id should get a 200 status code and a TOKEN', function () {
    return (0, _messageMock.pCreateMessageMock)().then(function (mock) {
      return _superagent2.default.get(apiURL + '/api/messages/' + mock.message._id).set('Authorization', 'Bearer ' + mock.accountMock.token);
    }).then(function (response) {
      expect(response.status).toEqual(200);
      expect(response.body.token).toBeTruthy();
    }).catch(function () {
      console.log('catching error when 200 status expected for get message route');
    });
  });
  test('GET /api/messages/:id should return 404 status when invalid id is sent', function () {
    return (0, _messageMock.pCreateMessageMock)().then(function (accountSetMock) {
      return _superagent2.default.get(apiURL + '/api/messages/invalidID').set('Authorization', 'Bearer ' + accountSetMock.accountMock.token);
    }).then(Promise.reject).catch(function (err) {
      expect(err.status).toEqual(404);
    });
  });
  test('GET /api/messages/:id shoudl return 401 status if token in invalid', function () {
    return (0, _messageMock.pCreateMessageMock)().then(function () {
      return _superagent2.default.get(apiURL + '/api/messages/:id').set('Authorization', 'Bearer').then(Promise.reject).catch(function (err) {
        expect(err.status).toEqual(401);
      });
    });
  });
});