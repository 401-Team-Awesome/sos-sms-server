'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jsonWebToken from 'jsonwebtoken';

const HASH_ROUNDS = 8;
const TOKEN_SEED_LENGTH = 128;

const accountSchema = mongoose.Schema({
  username: {
    type: String,
    // required: true,
    unique: true,
  },
  email: {
    type: String,
    // required: true, 
    unique: true,
  },
  password: {
    type: String,
    // required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  userPhoneNumber: {
    type: String, 
    // required: true,
    // unique: true,
  },
  tokenSeed: {
    type: String,
    required: true,
    unique: true,
  },
  timeStamp: {
    type: Date, 
    default: () => Date(),
  },
});

function pVerifyPassword(password) {
  return bcrypt.compare(password, this.passwordHash)
    .then((result) => {
      if (!result) {
        throw new Error('400', 'Password error AUTH - incorrect data');
      }
      return this;
    });
}

function pCreateToken() {
  this.tokenSeed = crypto.randomBytes(TOKEN_SEED_LENGTH).toString('hex');
  return this.save()
    .then((account) => {
      return jsonWebToken.sign({ tokenSeed: account.tokenSeed }, process.env.HASH_SECRET_STRING);
    });
}

accountSchema.methods.pCreateToken = pCreateToken;
accountSchema.methods.pVerifyPassword = pVerifyPassword;

const Account = mongoose.model('account', accountSchema);

Account.create = (username, email, password) => {
  return bcrypt.hash(password, HASH_ROUNDS)
    .then((passwordHash) => {
      password = null; 
      const tokenSeed = crypto.randomBytes(TOKEN_SEED_LENGTH).toString('hex');
      return new Account({
        passwordHash,
        tokenSeed,
      }).save();
    });
};


export default Account;
