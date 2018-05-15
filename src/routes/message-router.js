'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpErrors from 'http-errors';
import Twilio from 'twilio';
import logger from '../lib/logger';
import Message from '../model/message';
import Account from '../model/account';

// const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const jsonParser = bodyParser.json();
const messageRouter = new Router();

messageRouter.post('/api/messages/:id', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'MESSAGE-ROUTER POST: processing a request');
  console.log(request.body, 'this is the request body');
  if (!request.body.error) {
    logger.log(logger.INFO, 'MESSAGE-ROUTER POST: Error message required.');
    return next(new HttpErrors(400, 'Error message required.'));
  }

  return Account.findById(request.params.id)
    .then((account) => {
      console.log(request.params.id, 'params id in findbyid return');
      console.log(account, 'THIS IS THE ACCOUNT WE WANT');
      console.log(account.userPhoneNumber);
      return new Message({
        // username: account.username,
        // userPhoneNumber: account.userPhoneNumber,
        error: request.body.error,
        // errorLocation: request.body.errorLocation,
        message: request.body.message,
        account: account._id,
      }).save();
    })
    .then((message) => {
      console.log('MESSAGE IN THEN OF MESSAGE ROUTER', message);
      client.messages
        .create({
          body: `${message.error}: ${message.message}`,
          from: process.env.TWILIO_NUMBER,
          to: account.userPhoneNumber,
        })
        .then((twilioMessage) => {
          console.log('hi');
          console.log(twilioMessage.sid, 'this is the message.sid');
        })
        .done();
    })
    .then(console.log('FINAL THEN'))
    .catch(next);
});

export default messageRouter;
