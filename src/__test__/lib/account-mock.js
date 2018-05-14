'use strict';

import Account from '../../model/account';

const pCreateAccountMock = () => {
  return new Account({
    userPhoneNumber: process.env.PHONE_NUMBER,
  }).save();
};

const pRemoveAccountMock = () => Account.remove({});

export { pCreateAccountMock, pRemoveAccountMock };
