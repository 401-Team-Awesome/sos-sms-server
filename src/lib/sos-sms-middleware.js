'use strict';

import superagent from 'superagent';

const apiURL = `http://localhost:${process.env.PORT}`;

export default (error, userID, message) => {
  console.log(`${apiURL}/api/messages/${userID}`, 'url in sossms middleware');
  return superagent.post(`${apiURL}/api/messages/${userID}`)
    .send({ error, message });
};
