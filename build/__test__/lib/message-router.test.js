'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _server = require('../../lib/server');

var _sosSmsMiddleware = require('../../lib/sos-sms-middleware');

var _sosSmsMiddleware2 = _interopRequireDefault(_sosSmsMiddleware);

var _accountMock = require('../lib/account-mock');

var _logger = require('../../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiURL = 'http://localhost:' + process.env.PORT; // eslint-disable-line


describe('testing sms sos middleware', function () {
  console.log('starting test');
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
    return _superagent2.default.post(apiURL + '/api/messages/:id').send({
      username: 'zachary',
      password: 'doggy'
    }).then(Promise.reject).catch(function (error) {
      expect(error.status).toEqual(400);
    });
  });
  test('POST 404 due to no account found', function () {
    return _superagent2.default.post(apiURL + '/api/messages/').send({
      username: 'zachary',
      password: 'doggy'
    }).then(Promise.reject).catch(function (error) {
      expect(error.status).toEqual(404);
    });
  });
  test('POST should return a 409 status code, no duplicates', function () {
    return _superagent2.default.post(apiURL + '/signup').send({
      username: 'billie',
      email: 'billie@billie.com',
      password: 'nobirdieisthebest'
    }).then(function () {
      return _superagent2.default.post(apiURL + '/api/messages').send({
        username: 'billie',
        email: 'billie@billie.com',
        password: 'nobirdieisthebest'
      }).then(Promise.reject).catch(function (err) {
        expect(err.status).toEqual(409);
      });
    });
  });
});