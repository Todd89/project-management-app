const API_URL = {
  MAIN_URL: `https://tranquil-shelf-98389.herokuapp.com`,
};

const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const USER_STATUS = {
  AUTHORIZE: 'Authorized',
  UNAUTHORIZED: 'Unauthorized',
  REGISTERED: 'Registered',
  UNREGISTER: 'Unregister',
  WRONG: 'Something wrong',
  EXIST: 'User login already exists!',
  NOT_FOUND: 'User was not founded',
  EDIT_ERROR: 'User already exisit or any sever error',
  EDIT_SUCCESS: 'Edit profile successfully',
  DELETE_SUCCESS: 'User deleted',
};

const API_STATUS = {
  REAL_SUCCESS: 200,
  SUCCESS: 201,
  DELETE_SUCCESS: 204,
  OLD_TOKEN: 401,
  NOT_FOUND: 403,
  USER_ERROR: 404,
  EXIST: 409,
  SERVER_ERROR: 500,
};

export { API_URL, API_METHODS, USER_STATUS, API_STATUS };

export enum CONFIRMATION_STATE {
  'YES',
  'NO',
  'UNSET',
}
