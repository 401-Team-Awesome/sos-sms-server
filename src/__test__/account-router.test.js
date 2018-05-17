'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pRemoveAccountMock, pCreateAccountMock } from './lib/account-mock';

const apiURL = `http://localhost:${process.env.PORT}/api`;

describe('ACCOUNT Router', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveAccountMock);

  test('POST should return a 200 status code and a TOKEN', () => {
    return superagent.post(`${apiURL}/signup`)
      .send({
        username: 'testuser',
        email: 'testuser@testuser.com',
        password: 'testuserpassword',
        userPhoneNumber: '+91112223333',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      });
  });
  test('POST should return a 400 status code, bad request', () => {
    return superagent.post(`${apiURL}/signup`)
      .send({
        username: '',
        email: '',
        password: '',
      })
      .then((Promise.reject))
      .catch((err) => {
        expect(err.status).toEqual(400);
      });
  });

  test('POST should return a 409 status code, no duplicates', () => {
    return superagent.post(`${apiURL}/signup`)
      .send({
        username: 'testuser',
        email: 'testuser@testuser.com',
        password: 'testuserpassword',
        userPhoneNumber: '+12223334444',
      })
      .then(() => {
        return superagent.post(`${apiURL}/signup`)
          .send({
            username: 'testuser',
            email: 'testuser@testuser.com',
            password: 'testuserpassword',
            userPhoneNumber: '+12223334444',
          })
          .then((Promise.reject))
          .catch((err) => {
            expect(err.status).toEqual(409);
          });
      });
  });
  test('GET /login', () => {
    return pCreateAccountMock()
      .then((mock) => {
        return superagent.get(`${apiURL}/login`)
          .auth(mock.request.username, mock.request.password);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      });
  });
  test('GET /login should return 400 bad request', () => {
    return pCreateAccountMock()
      .then((mock) => {
        return superagent.get(`${apiURL}/login`)
          .send(mock.request.username, mock.request.password);
      })
      .then(Promise.reject)
      .catch((err) => {
        expect(err.status).toEqual(400);
      });
  });
});

