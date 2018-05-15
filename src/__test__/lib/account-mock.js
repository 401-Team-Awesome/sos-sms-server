'use strict';

import faker from 'faker';
import Account from '../../model/account';


const pCreateAccountMock = () => {
  console.log('inside createaccountmock');
  return new Account({
    // userPhoneNumber: '123456',
    // username: 'sarah',
    userPhoneNumber: process.env.PHONE_NUMBER,
  }).save();
};

const pRemoveAccountMock = () => Account.remove({});

export { pCreateAccountMock, pRemoveAccountMock };

