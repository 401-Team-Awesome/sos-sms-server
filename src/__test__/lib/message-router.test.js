'use strict';

import superagent from 'superagent';
import faker from 'faker'; // eslint-disable-line
import { startServer, stopServer } from '../../lib/server';
import sossms from '../../lib/sos-sms-middleware';
import { pCreateMessageMock, pRemoveMessageMock } from '../lib/message-mock'; // eslint-disable-line
import { pCreateAccountMock, pRemoveAccountMock } from '../lib/account-mock'; // eslint-disable-line
import logger from '../../lib/logger';


const apiURL = `http://localhost:${process.env.PORT}`;


describe('testing sms sos middleware', () => {
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
    return pCreateAccountMock()
      .then((response) => {
        return superagent.post(`${apiURL}/api/messages/${response.account._id}`)
          .send({
            username: 'zachary',
          })
          .then(Promise.reject)
          .catch((error) => {
            expect(error.status).toEqual(400);
          });
      });
  });
  test('POST 404 due to no account found', () => {
    return pCreateAccountMock()
      .then(() => {
        return superagent.post(`${apiURL}/api/messages/notAValidId`)
          .send({
            error: '500',
            password: 'red alert',
          })
          .then(Promise.reject)
          .catch((error) => {
            expect(error.status).toEqual(404);
          });
      });
  });

  test('GET /api/messages/:id should get a 200 status code and a TOKEN', () => {
    return pCreateMessageMock()
      .then((mock) => {
        return superagent.get(`${apiURL}/api/messages/${mock.message._id}`)
          .set('Authorization', `Bearer ${mock.accountMock.token}`);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      })
      .catch(() => {
        console.log('catching error when 200 status expected for get message route');
      });
  });
  test('GET /api/messages/:id should return 404 status when invalid id is sent', () => {
    return pCreateMessageMock()
      .then((accountSetMock) => {
        return superagent.get(`${apiURL}/api/messages/invalidID`)
          .set('Authorization', `Bearer ${accountSetMock.accountMock.token}`);
      })
      .then(Promise.reject)
      .catch((err) => {
        expect(err.status).toEqual(404);
      });
  });
  test('GET /api/messages/:id shoudl return 401 status if token in invalid', () => {
    return pCreateMessageMock()
      .then(() => {
        return superagent.get(`${apiURL}/api/messages/:id`)
          .set('Authorization', 'Bearer')
          .then(Promise.reject)
          .catch((err) => {
            expect(err.status).toEqual(401);
          });
      });
  });
});
