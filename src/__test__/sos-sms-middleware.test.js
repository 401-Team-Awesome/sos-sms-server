'use strict';

import { startServer, stopServer } from '../lib/server';
import sossms from '../lib/sos-sms-middleware';
import { pCreateAccountMock, pRemoveAccountMock } from './lib/account-mock';
import logger from '../lib/logger';

describe('testing sms sos middleware', () => {
  console.log('starting test');
  logger.log(logger.INFO, 'this is the test starting');

  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveAccountMock);

  test('should send a request to our api', () => {
    let userID = null;
    return pCreateAccountMock()
      .then((response) => {
        console.log(response, 'this is the response of the createAccountMock');
        userID = response._id;
        console.log(userID, 'this is the userid');
        sossms('400', userID, 'its bad bro, but its ok also')
          .then((res) => {
            expect(res.status).toEqual(200);
          });
      });
  });
});
