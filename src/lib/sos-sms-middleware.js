'use strict';

import superagent from 'superagent';

const apiURL = `http://localhost:${process.env.PORT}`;

export default (error, userID, message, next) => {
  return superagent.post(`${apiURL}/messages/:${userID}`)
    .send({ error, message })
    .then(() => next())
    .catch(next);
};
