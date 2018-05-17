'use strict';

const faker = require('faker');

const loadTestUser = module.exports = {};

loadTestUser.create = (userContext, event, done) => {
  userContext.vars.username = faker.internet.userName() + Math.random().toString();
  userContext.vars.email = faker.internet.email();
  userContext.vars.password = faker.internet.password() + Math.random().toString();
  userContext.vars.userPhoneNumber = faker.random.number({ min: 10000000000, max: 99999999999 });
  userContext.vars.error = faker.random.number({ min: 300, max: 600 });
  userContext.vars.message = faker.lorem.words(5);

  return done();
};

// in oldschool es5 functions, when we doing async, we often have to call done, indicate we done

// Math.random, beause faker can't actually create enough unique values to reliably create truly unique usernames etc
