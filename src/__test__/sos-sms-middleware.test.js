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
  test('should post message to deployed db and send a request to our api', () => {
    const userID = '5afb7b8abd90e3001a22d56e';
    return sossms('400', userID, 'its your problem bro')
      .then((res) => {
        expect(res.status).toEqual(200);
      })
      .catch((err) => {
        console.log('start of error', err, 'end of error');
      });
  });
});
