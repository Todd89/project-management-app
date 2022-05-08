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
  EXIST: 'User login already exists!',
  NOT_FOUND: 'User was not founded',
};

const API_STATUS = {
  SUCCESS: 201,
  NOT_FOUND: 403,
  EXIST: 409,
};

export { API_URL, API_METHODS, USER_STATUS, API_STATUS };
