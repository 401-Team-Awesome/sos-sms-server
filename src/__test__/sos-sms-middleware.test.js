'use strict';

import { startServer, stopServer } from '../lib/server';
import sossms from '../lib/sos-sms-middleware';
import pCreateAccountMock from './lib/account-mock';


describe('testing sms sos middleware', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  let userID = null;
  pCreateAccountMock()
    .then((response) => {
      userID = response._id;
    });
  it('should send a request to our api', () => {
    sossms('400', userID, 'its your problem bro')
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });
});
