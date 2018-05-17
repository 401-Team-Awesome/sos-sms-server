'use strict';

const faker = require('faker');

const loadTestMessage = module.exports = {};

loadTestMessage.create = (userContext, event, done) => { 
  userContext.vars.userPhoneNumber = faker.random.number({ min: 10000000000, max: 99999999999 });
  userContext.vars.error = faker.random.number({ min: 300, max: 600 });
  userContext.vars.message = faker.lorem.words(5);
  return done();
};
