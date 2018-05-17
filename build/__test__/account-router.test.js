'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _server = require('../lib/server');

var _accountMock = require('./lib/account-mock');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiURL = 'http://localhost:' + process.env.PORT + '/api';

describe('ACCOUNT Router', function () {
  beforeAll(_server.startServer);
  afterAll(_server.stopServer);
  afterEach(_accountMock.pRemoveAccountMock);

  test('POST should return a 200 status code and a TOKEN', function () {
    return _superagent2.default.post(apiURL + '/signup').send({
      username: 'testuser',
      email: 'testuser@testuser.com',
      password: 'testuserpassword',
      userPhoneNumber: '+91112223333'
    }).then(function (response) {
      expect(response.status).toEqual(200);
      expect(response.body.token).toBeTruthy();
    });
  });
  test('POST should return a 400 status code, bad request', function () {
    return _superagent2.default.post(apiURL + '/signup').send({
      username: '',
      email: '',
      password: ''
    }).then(Promise.reject).catch(function (err) {
      expect(err.status).toEqual(400);
    });
  });

  test('POST should return a 409 status code, no duplicates', function () {
    return _superagent2.default.post(apiURL + '/signup').send({
      username: 'testuser',
      email: 'testuser@testuser.com',
      password: 'testuserpassword',
      userPhoneNumber: '+12223334444'
    }).then(function () {
      return _superagent2.default.post(apiURL + '/signup').send({
        username: 'testuser',
        email: 'testuser@testuser.com',
        password: 'testuserpassword',
        userPhoneNumber: '+12223334444'
      }).then(Promise.reject).catch(function (err) {
        expect(err.status).toEqual(409);
      });
    });
  });
  test('GET /login', function () {
    return (0, _accountMock.pCreateAccountMock)().then(function (mock) {
      return _superagent2.default.get(apiURL + '/login').auth(mock.request.username, mock.request.password); // this is IMPORTANT, .auth is a superagent method to send usernames and passwords
    }).then(function (response) {
      expect(response.status).toEqual(200);
      expect(response.body.token).toBeTruthy();
    });
  });
  test('GET /login should return 400 bad request', function () {
    return (0, _accountMock.pCreateAccountMock)().then(function (mock) {
      return _superagent2.default.get(apiURL + '/login').send(mock.request.username, mock.request.password);
    }).then(Promise.reject).catch(function (err) {
      expect(err.status).toEqual(400);
    });
  });
});