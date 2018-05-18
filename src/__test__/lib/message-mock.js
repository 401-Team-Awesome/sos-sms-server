'use strict';

import faker from 'faker';
import { pCreateAccountMock } from './account-mock';
import Message from '../../model/message';
import Account from '../../model/account';

const pCreateMessageMock = () => {
  const resultMock = {};
  return pCreateAccountMock()
    .then((mockAcctResponse) => {
      resultMock.accountMock = mockAcctResponse;
      return new Message({
        account: resultMock.accountMock.account._id,
        message: faker.lorem.words(2),
        error: faker.lorem.word,
      }).save();
    })
    .then((message) => {
      resultMock.message = message;
      return resultMock;
    });
};

const pRemoveMessageMock = () => Promise.all([Account.remove({}), Message.remove({})]);

export { pCreateMessageMock, pRemoveMessageMock };
