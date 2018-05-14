'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpErrors from 'http-errors';
import Twilio from 'twilio';
import logger from '../lib/logger';
import Message from '../model/message';
import Account from '../model/account';

const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const jsonParser = bodyParser.json();
const messageRouter = new Router();

messageRouter.post('/api/messages/:id', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'MESSAGE-ROUTER POST: processing a request');
  if (!request.body.error) {
    logger.log(logger.INFO, 'MESSAGE-ROUTER POST: Error message required.');
    return next(new HttpErrors(400, 'Error message required.'));
  }
  return Account.findById(request.params.id)
    .then((account) => {
      // logger.log(logger.INFO, 'MESSAGE-ROUTER POST: 200 status');
      client.messages
        .create({
          body: `${request.body.error}: ${request.body.message}`,
          from: process.env.TWILIO_NUMBER,
          to: account.userPhoneNumber,
        })
        .then(message => console.log(message.sid, 'this is the message.sid'))
        .done();
    })
    .then(console.log('message sent via twilio'))
    .catch(next);
});

export default messageRouter;
