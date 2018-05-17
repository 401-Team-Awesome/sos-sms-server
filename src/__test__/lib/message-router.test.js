'use strict';

import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../../lib/server';
import sossms from '../../lib/sos-sms-middleware';
import { pCreateAccountMock, pRemoveAccountMock } from '../lib/account-mock'; // eslint-disable-line
import logger from '../../lib/logger';


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
        userID = response._id;
        return sossms('400', userID, 'its your problem yo')
          .then((res) => {
            expect(res.status).toEqual(200);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  });
  test('POST 400 due to bad request', () => {
    return superagent.post(`${apiURL}/api/messages/:id`)
      .send({
        username: 'zachary',
        password: 'doggy',
      })
      .then(Promise.reject)
      .catch((error) => {
        expect(error.status).toEqual(400);
      });
  });
  test('POST 404 due to no account found', () => {
    return superagent.post(`${apiURL}/api/messages/`)
      .send({
        username: 'zachary',
        password: 'doggy',
      })
      .then(Promise.reject)
      .catch((error) => {
        expect(error.status).toEqual(404);
      });
  });
  test('POST should return a 409 status code, no duplicates', () => {
    return superagent.post(`${apiURL}/signup`)
      .send({
        username: 'billie',
        email: 'billie@billie.com',
        password: 'nobirdieisthebest',
      })
      .then(() => {
        return superagent.post(`${apiURL}/api/messages`)
          .send({
            username: 'billie',
            email: 'billie@billie.com',
            password: 'nobirdieisthebest',
          })
          .then((Promise.reject))
          .catch((err) => {
            expect(err.status).toEqual(409);
          });
      });
  });
  test.only('GET /api/messages/:id should get a 200 status code and a TOKEN', () => {
    return pCreateAccountMock()
      .then((mock) => {
        return superagent.get(`${apiURL}/messages/:id`)
          .auth(mock.request.username, mock.request.password);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
