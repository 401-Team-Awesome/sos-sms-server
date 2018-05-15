'use strict';

import faker from 'faker'; // eslint-disable-line
import Account from '../../model/account';


const pCreateAccountMock = () => {
  console.log('inside createaccountmock');
  return new Account({
    // userPhoneNumber: '123456',
    userPhoneNumber: process.env.PHONE_NUMBER,
  }).save();
};

const pRemoveAccountMock = () => Account.remove({});

export { pCreateAccountMock, pRemoveAccountMock };
