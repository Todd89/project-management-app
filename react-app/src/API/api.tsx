import { INewUser, IUser, INewColumn, INewBoard, INewTask, IUpdateTask } from '../interface/types';
import { API_URL, API_METHODS, USER_STATUS, API_STATUS } from '.././constant/constant';

class HTTPClient {
  //Users
  async getAllUsers(token: string) {
    try {
      const response = await fetch(`${API_URL.MAIN_URL}/users`, {
        method: `${API_METHODS.GET}`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (response.status === API_STATUS.REAL_SUCCESS) {
        return await response.json();
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }
  async getUserByID(ID: string, token: string) {
    try {
      const response = await fetch(`${API_URL.MAIN_URL}/users/${ID}`, {
        method: `${API_METHODS.GET}`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (response.status === API_STATUS.REAL_SUCCESS) {
        return await response.json();
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }
  async deleteUserByID(ID: string, token: string) {
    try {
      const response = await fetch(`${API_URL.MAIN_URL}/users/${ID}`, {
        method: `${API_METHODS.DELETE}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === API_STATUS.DELETE_SUCCESS) {
        return USER_STATUS.DELETE_SUCCESS;
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }
  async updateUser(ID: string, token: string, user: INewUser) {
    try {
      const response = await fetch(`${API_URL.MAIN_URL}/users/${ID}`, {
        method: `${API_METHODS.PUT}`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (response.status === API_STATUS.REAL_SUCCESS) {
        return await response.json();
      }
      if (response.status === API_STATUS.SERVER_ERROR) {
        return USER_STATUS.EDIT_ERROR;
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }
  // Authorization
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
  async getUserToken(user: INewUser) {
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
  // Boards
  async getAllBoards(token: string) {
    try {
      const response = await fetch(`${API_URL.MAIN_URL}/boards`, {
        method: `${API_METHODS.GET}`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.status === API_STATUS.REAL_SUCCESS) {
        return await response.json();
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }

  async createBoard(token: string, boardTitle: INewBoard) {
    try {
      const response = await fetch(`${API_URL.MAIN_URL}/boards`, {
        method: `${API_METHODS.POST}`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(boardTitle),
      });

      if (response.status === API_STATUS.SUCCESS) {
        return await response.json();
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }

  async getBoardByID(token: string, boardID: string) {
    try {
      const response = await fetch(`${API_URL.MAIN_URL}/boards/${boardID}`, {
        method: `${API_METHODS.GET}`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (response.status === API_STATUS.REAL_SUCCESS) {
        return await response.json();
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }
  async deleteBoard(token: string, boardID: string) {
    try {
      const response = await fetch(`${API_URL.MAIN_URL}/boards/${boardID}`, {
        method: `${API_METHODS.DELETE}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error('Error: ', err);
    }
  }
  async updateBoard(token: string, boardID: string, boardTitle: INewBoard) {
    try {
      const response = await fetch(`${API_URL.MAIN_URL}/boards/${boardID}`, {
        method: `${API_METHODS.PUT}`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(boardTitle),
      });
      if (response.status === API_STATUS.REAL_SUCCESS) {
        return await response.json();
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }

  // Columns

  async getAllColumns(token: string, boardID: string) {
    try {
      const response = await fetch(`${API_URL.MAIN_URL}/boards/${boardID}/columns`, {
        method: `${API_METHODS.GET}`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (response.status === API_STATUS.REAL_SUCCESS) {
        return await response.json();
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }
  async createColumn(token: string, boardID: string, columnBody: INewColumn) {
    try {
      const response = await fetch(`${API_URL.MAIN_URL}/boards/${boardID}/columns`, {
        method: `${API_METHODS.POST}`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(columnBody),
      });

      if (response.status === API_STATUS.SUCCESS) {
        return await response.json();
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }
  async getColumn(token: string, boardID: string, columnID: string) {
    try {
      const response = await fetch(`${API_URL.MAIN_URL}/boards/${boardID}/columns/${columnID}`, {
        method: `${API_METHODS.GET}`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.status === API_STATUS.REAL_SUCCESS) {
        return await response.json();
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }
  async deleteColumn(token: string, boardID: string, columnID: string) {
    try {
      const response = await fetch(`${API_URL.MAIN_URL}/boards/${boardID}/columns/${columnID}`, {
        method: `${API_METHODS.DELETE}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error('Error: ', err);
    }
  }
  async updateColumn(token: string, boardID: string, columnID: string, columnBody: INewColumn) {
    try {
      const response = await fetch(`${API_URL.MAIN_URL}/boards/${boardID}/columns/${columnID}`, {
        method: `${API_METHODS.PUT}`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(columnBody),
      });

      if (response.status === API_STATUS.REAL_SUCCESS) {
        return await response.json();
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }

  // Tasks

  async getAllTasks(token: string, boardID: string, columnID: string) {
    try {
      const response = await fetch(
        `${API_URL.MAIN_URL}/boards/${boardID}/columns/${columnID}/tasks`,
        {
          method: `${API_METHODS.GET}`,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === API_STATUS.REAL_SUCCESS) {
        return await response.json();
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }
  async createTask(token: string, boardID: string, columnID: string, taskBody: INewTask) {
    try {
      const response = await fetch(
        `${API_URL.MAIN_URL}/boards/${boardID}/columns/${columnID}/tasks`,
        {
          method: `${API_METHODS.POST}`,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskBody),
        }
      );
      if (response.status === API_STATUS.SUCCESS) {
        return await response.json();
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }
  async getTaskByID(token: string, boardID: string, columnID: string, taskID: string) {
    try {
      const response = await fetch(
        `${API_URL.MAIN_URL}/boards/${boardID}/columns/${columnID}/tasks/${taskID}`,
        {
          method: `${API_METHODS.GET}`,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === API_STATUS.REAL_SUCCESS) {
        return await response.json();
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }
  async deleteTask(token: string, boardID: string, columnID: string, taskID: string) {
    try {
      const response = await fetch(
        `${API_URL.MAIN_URL}/boards/${boardID}/columns/${columnID}/tasks/${taskID}`,
        {
          method: `${API_METHODS.DELETE}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error('Error: ', err);
    }
  }
  async updateTask(
    token: string,
    boardID: string,
    columnID: string,
    taskID: string,
    taskBody: IUpdateTask
  ) {
    try {
      const response = await fetch(
        `${API_URL.MAIN_URL}/boards/${boardID}/columns/${columnID}/tasks/${taskID}`,
        {
          method: `${API_METHODS.PUT}`,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskBody),
        }
      );
      if (response.status === API_STATUS.REAL_SUCCESS) {
        return await response.json();
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }

  // Files
  async fileUpload(token: string) {
    try {
      const response = await fetch(`${API_URL.MAIN_URL}/file`, {
        method: `${API_METHODS.POST}`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: '*/*',
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === API_STATUS.REAL_SUCCESS) {
        return await response.json();
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }
  async fileDownload(token: string, taskID: string, filename: string) {
    try {
      const response = await fetch(`${API_URL.MAIN_URL}/file/${taskID}/${filename}`, {
        method: `${API_METHODS.GET}`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: '*/*',
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === API_STATUS.REAL_SUCCESS) {
        return await response.json();
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }
}

const httpClient = new HTTPClient();

export default httpClient;
