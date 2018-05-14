'use strict';

import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
  userID: { type: String }, // will be created my mongo
  userPhoneNumber: {
    type: Number, 
    required: true,
    unique: true,
  },
});

export default mongoose.model('account', accountSchema);
