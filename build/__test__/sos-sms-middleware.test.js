'use strict';

var _server = require('../lib/server');

var _sosSmsMiddleware = require('../lib/sos-sms-middleware');

var _sosSmsMiddleware2 = _interopRequireDefault(_sosSmsMiddleware);

var _accountMock = require('./lib/account-mock');

var _logger = require('../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('testing sms sos middleware', function () {
  console.log('starting test');
  _logger2.default.log(_logger2.default.INFO, 'this is the test starting');

  beforeAll(_server.startServer);
  afterAll(_server.stopServer);
  afterEach(_accountMock.pRemoveAccountMock);

  // test('should send a request to our api', () => {
  //   let userID = null;
  //   return pCreateAccountMock()
  //     .then((response) => {
  //       console.log(response, 'this is the response of the createAccountMock');
  //       userID = response._id;
  //       console.log(userID, 'this is the userid');
  //       return sossms('400', userID, 'its your problem bro')
  //         .then((res) => {
  //           expect(res.status).toEqual(200);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     });
  // });
  test('should post message to deployed db and send a request to our api', function () {
    var userID = '5afb7b8abd90e3001a22d56e';
    return (0, _sosSmsMiddleware2.default)('400', userID, 'testing deployed again').then(function (res) {
      expect(res.status).toEqual(200);
    }).catch(function (err) {
      console.log('start of error', err, 'end of error');
    });
  });
});