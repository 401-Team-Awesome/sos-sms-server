'use strict';

import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
  // username: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  userPhoneNumber: {
    type: String, 
    required: true, 
    // unique: true,
  },
});

export default mongoose.model('account', accountSchema);
