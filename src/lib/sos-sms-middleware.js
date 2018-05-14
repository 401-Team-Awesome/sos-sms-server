'use strict';

import superagent from 'superagent';

const apiURL = `http://localhost:${process.env.PORT}`;

export default sossms = (error, userID, message) => {
  return superagent.post(`${apiURL}/messages/:${userID}`)
    .send({ error, message })
    .then(response => response)
    .catch(err => err);
};
