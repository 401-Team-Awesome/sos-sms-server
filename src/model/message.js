'use strict';

import mongoose from 'mongoose';
import HttpError from 'http-errors'; // eslint-disable-line
import Account from '../model/account'; // eslint-disable-line

const messageSchema = mongoose.Schema({
  userPhoneNumber: {
    type: String,
  },
  error: {
    type: String,
  },
  message: {
    type: String,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: () => new Date(), 
  },
});

export default mongoose.model('message', messageSchema);
