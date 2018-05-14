'use strict';

import mongoose from 'mongoose';
import HttpError from 'http-errors';
import Account from '../model/account'; // eslint-disable-line

const messageSchema = mongoose.Schema({
  user: {
    type: String,
    // required: true,
    unique: true,
  },
  error: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'account',
  },
});

export default mongoose.model('message', messageSchema);
