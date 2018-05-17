'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpErrors from 'http-errors';
import Twilio from 'twilio';
import logger from '../lib/logger';
import Message from '../model/message';
import Account from '../model/account';
import bearerAuthMiddleware from '../lib/bearer-auth-middleware';

// const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const jsonParser = bodyParser.json();
const messageRouter = new Router();

messageRouter.post('/api/messages/:id', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'MESSAGE-ROUTER POST: processing a request');
  // console.log(request.body, 'this is the body');
  if (!request.body.error) {
    logger.log(logger.INFO, 'MESSAGE-ROUTER POST: Error message required.');
    return next(new HttpErrors(400, 'Error message required.'));
  }
  return Account.findById(request.params.id)
    .then((account) => {
      // console.log(request.body, 'request body in findbyid return');
      // console.log(account, 'this is the account');
      // console.log(account.userPhoneNumber, 'THE PHONE NUMBER');
      return new Message({
        userPhoneNumber: account.userPhoneNumber,
        account: account._id,
        error: request.body.error,
        message: request.body.message,
      })
        .save()
        .then((message) => {
          console.log(request.body.error, request.body.message, 'error and message');
          console.log(message.userPhoneNumber, 'this is the phoneNumber from the message model');
          client.messages
            .create({
              body: `${request.body.error}: ${request.body.message}`,
              from: process.env.TWILIO_NUMBER,
              to: message.userPhoneNumber,
            })
            .then((twilioMessage) => {
              console.log('hi');
              console.log(twilioMessage.sid, 'this is the message.sid');
            })
            .done();
        })
        .catch((err) => {
          console.log(err, 'this is the err in the catch');
        });
    })
    .then((messageResponse) => {
      console.log('message sent via twilio');
      return response.json(messageResponse);
    })
    .catch(next);
});

messageRouter.get('/api/messages/:id', bearerAuthMiddleware, (request, response, next) => {
  return Message.findById(request.params.id)
    .then((message) => {
      logger.log(logger.INFO, 'MESSAGE ROUTER: responding with a 200 status code');
      logger.log(logger.INFO, `MESSAGE ROUTER: ${JSON.stringify(message)}`);
      return response.json(message);
    })
    .catch(next);
});

export default messageRouter;
