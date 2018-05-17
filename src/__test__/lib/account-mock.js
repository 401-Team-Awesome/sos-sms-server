// 'use strict';

// import faker from 'faker'; // eslint-disable-line
// import Account from '../../model/account';


// const pCreateAccountMock = () => {
//   console.log('inside createaccountmock');
//   return new Account({
//     // userPhoneNumber: '123456',
//     userPhoneNumber: process.env.PHONE_NUMBER,
//   }).save();
// };

// const pRemoveAccountMock = () => Account.remove({});

// export { pCreateAccountMock, pRemoveAccountMock };

'use strict';

import faker from 'faker';
import Account from '../../model/account';

const pCreateAccountMock = () => {
  const mock = {};

  mock.request = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.lorem.words(5),
    userPhoneNumber: process.env.PHONE_NUMBER,
    // userPhoneNumber: `+${faker.random.number({ min: 10000000000, max: 99999999999 })}`,
  }; 
  return Account.create(mock.request.username, mock.request.email, mock.request.password, mock.request.userPhoneNumber) 
    .then((account) => {
      console.log('WERE in the AUTH CREATE FUNCTION', account);
      mock.account = account;
      return account.pCreateToken();
    })
    .then((token) => {
      console.log(token, 'TOKEN MOCK ACCOUNT');
      mock.token = token;
      return Account.findById(mock.account._id);
    })
    .then((account) => {
      mock.account = account;
      console.log(mock, 'WHERE IS THE TOKEN MOCK ACCOUNT');
      return mock;
    });
};

const pRemoveAccountMock = () => Account.remove({});

export { pRemoveAccountMock, pCreateAccountMock };
