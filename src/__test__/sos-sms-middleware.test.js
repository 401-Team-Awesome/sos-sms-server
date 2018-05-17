'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import sossms from '../lib/sos-sms-middleware';
import { pCreateAccountMock, pRemoveAccountMock } from './lib/account-mock'; // eslint-disable-line
import logger from '../lib/logger';


const apiURL = `http://localhost:${process.env.PORT}`;

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
        userID = response.account._id;
        console.log(userID, 'this is the userid');
        return sossms('400', userID, 'its your problem yo')
          .then((res) => {
            expect(res.status).toEqual(200);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  });
  // test('POST - should display 409 if there is a duplicate', () => {
  //   return pCreateAccountMock()
  //     .then((accountMock) => {
  //       console.log(accountMock, 'HERE IS  MY LOOOOG');
  //       const duplicateData = {
  //         userPhoneNumber: '+15555555555',
  //       };
  //       return superagent.post(`${apiURL}/api/accounts`)
  //         .send(duplicateData)
  //         .catch((err) => {
  //           expect(err.status).toEqual(409);
  //         });
  //     });
  // });
  // test('POST - should respond with 400 due to no account available', () => {
  //   return superagent.post(`${apiURL}/api/accounts`)
  //     .send({})
  //     .then(Promise.reject)
  //     .catch((err) => {
  //       expect(err.status).toEqual(400);
  //     });
  // });
  // test('POST - should respond with 400 due to bad json', () => {
  //   return superagent.post(`${apiURL}/api/accounts`)
  //     .send('{')
  //     .then(Promise.reject)
  //     .catch((err) => {
  //       expect(err.status).toEqual(400);
  //     });
  // });
  // test('POST - should respond with 404 status if there is no userID', () => {
  //   const userID = '7777';
  //   return superagent.post(`${apiURL}/api/accounts/${userID}`)
  //     .then(Promise.reject)
  //     .catch((response) => {
  //       expect(response.status).toEqual(404);
  //     });
  // });
  // test('should post message to deployed db and send a request to our api', () => {
  //   const userID = '5afc756cd3fbe3001a1e8180';
  //   return sossms('400', userID, 'testing deployed again')
  //     .then((res) => {
  //       expect(res.status).toEqual(200);
  //       console.log('INSIDE OF TEST POST !!!!!');
  //     })
  //     .catch((err) => {
  //       console.log('start of error', err, 'end of error');
  //     });
  // });
});
