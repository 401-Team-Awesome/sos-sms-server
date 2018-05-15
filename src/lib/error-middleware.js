'use strict';

import logger from './logger';

export default (error, request, response, next) => {
  logger.log(logger.ERROR, '__ERROR_IN_MIDDLEWARE__');
  logger.log(logger.ERROR, error);

  if (error.status) {
    console.log('ERROR IS WHAT', error);
    logger.log(logger.INFO, `Responding with a ${error.status} code and message ${error.message}`);
    return response.sendStatus(error.status);
  }

  const errorMessage = error.message.toLowerCase();

  if (errorMessage.includes('objectid failed')) {
    logger.log(logger.INFO, 'Responding with a 404 code');
    console.log('ERROR IS WHAT', error); 
    return response.sendStatus(404);
  }

  if (errorMessage.includes('validation failed')) {
    console.log('ERROR IS WHAT', error);
    logger.log(logger.INFO, 'Responding with a 400 code');
    return response.sendStatus(400);
  }

  if (errorMessage.includes('duplicate key')) {
    console.log('ERROR IS WHAT', error);
    logger.log(logger.INFO, 'Responding with a 409 code');
    return response.sendStatus(409);
  }

  if (errorMessage.includes('unauthorized')) {
    console.log('ERROR IS WHAT', error);
    logger.log(logger.INFO, 'Responding with a 401 code');
    return response.sendStatus(401);
  }

  logger.log(logger.ERROR, 'Responding with a 500 error code');
  console.log('ERROR IS WHAT', error);
  logger.log(logger.ERROR, error);
  return response.sendStatus(500);
};
