'use strict';

import mongoose from 'mongoose';
import HttpError from 'http-errors';
import Account from '../model/account'; // eslint-disable-line

const messageSchema = mongoose.Schema({
  // user: {
  //   type: String,
  //   // required: true,
  //   unique: true,
  // },
  userPhoneNumber: {
    type: String,
  },
  error: {
    type: String,
    // required: true,
  },
  // errorLocation: {
  //   type: String,
  // },
  message: {
    type: String,
  },
  // response: {
  //   type: String,
  // },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // unique: true,
  },
  timeStamp: {
    type: Date,
    default: () => new Date(), 
  },
});

export default mongoose.model('message', messageSchema);
