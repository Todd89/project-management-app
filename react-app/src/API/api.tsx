import { INewUser, IUser } from '../interface/types';
import { API_URL, API_METHODS, USER_STATUS, API_STATUS } from '.././constant/constant';

class HTTPClient {
  async setNewUser(user: INewUser) {
    try {
      const response = await fetch(`${API_URL.MAIN_URL}/signup`, {
        method: `${API_METHODS.POST}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.status === API_STATUS.SUCCESS) {
        return await response.json();
      }
      if (response.status === API_STATUS.EXIST) {
        return `${USER_STATUS.EXIST}`;
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }
  async getUserToken(user: IUser) {
    try {
      const response = await fetch(`${API_URL.MAIN_URL}/signin`, {
        method: `${API_METHODS.POST}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.status === API_STATUS.SUCCESS) {
        return await response.json();
      }
      if (response.status === API_STATUS.NOT_FOUND) {
        return `${USER_STATUS.NOT_FOUND}`;
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }
}

const httpClient = new HTTPClient();

export default httpClient;
