'use strict';

import superagent from 'superagent';

// const apiURL = `http://localhost:${process.env.PORT}`;
const apiURL = 'https://sos-sms.herokuapp.com';

export default (error, userID, message) => {
  console.log(`${apiURL}/api/messages/${userID}`, 'url in sossms middleware');
  return superagent.post(`${apiURL}/api/messages/${userID}`)
    .send({ error, message })
    .then((data) => {
      return data;
    })
    .catch(error);
};
