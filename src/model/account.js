'use strict';

import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
  userPhoneNumber: {
    type: String, 
    required: true,
    // unique: true,
  },
});

export default mongoose.model('account', accountSchema);
