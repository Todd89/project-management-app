import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from '../../API/api';
import {
  IBoard,
  IColumn,
  ICreateBoard,
  ICreateColumn,
  ICreateTask,
  IDeleteBoard,
  IDeleteColumn,
  IDeleteTask,
  IGetBoard,
  IGetBoardColumns,
  IGetTasks,
  IShortBoard,
  ITask,
  ITempColumn,
  IUpdateBoard,
  IUpdateColumn,
  IUpdateTaskAPI,
  IUpdateAllTasks,
} from '../../interface/interfaces';

export interface DataBoards {
  boardsArray: Array<IShortBoard>;
  currentBoard: IBoard;
  columnsArray: Array<ITempColumn>;
  currentColumn: IColumn;
  tasksArray: Array<ITask>;
  isChanged: boolean;
  isModalOn: boolean;
}

export const initialState: DataBoards = {
  boardsArray: [],
  currentBoard: { id: '', title: '', columns: [] },
  columnsArray: [],
  currentColumn: { id: '', title: '', order: 0, tasks: [] },
  tasksArray: [],
  isChanged: false,
  isModalOn: false,
};

export const getAllBoardsFromAPI = createAsyncThunk(
  'getAllBoardsFromAPI',
  async (token: string, { dispatch }) => {
    const boardsAPI = await httpClient.getAllBoards(token);
    if (boardsAPI) {
      dispatch(setAppBoards(boardsAPI));
    }
  }
);

export const createNewBoardAPI = createAsyncThunk(
  'createNewBoardAPI',
  async (data: ICreateBoard, { dispatch }) => {
    const boardAPI = await httpClient.createBoard(data.token, data.board);
    if (boardAPI) {
      getAllBoardsFromAPI(data.token);
      dispatch(setIsChanged(true));
      dispatch(getAllBoardsFromAPI(data.token));
    }
  }
);

export const getBoardByIdAPI = createAsyncThunk(
  'getBoardByIdAPI',
  async (data: IGetBoard, { dispatch }) => {
    const boardAPI = await httpClient.getBoardByID(data.token, data.boardId);
    if (boardAPI) {
      dispatch(setCurrentBoard(boardAPI));
    }
  }
);

export const updateBoard = createAsyncThunk(
  'updateBoard',
  async (data: IUpdateBoard, { dispatch }) => {
    await httpClient.updateBoard(data.token, data.boardId, { title: data.boardTitle });
    dispatch(getBoardByIdAPI({ token: data.token, boardId: data.boardId }));
  }
);

export const getBoardColumnsFromAPI = createAsyncThunk(
  'getBoardColumnsFromAPI',
  async (data: IGetBoardColumns, { dispatch }) => {
    const boardColumnsAPI = await httpClient.getAllColumns(data.token, data.boardId);
    dispatch(setAppColumns(boardColumnsAPI));
  }
);

export const createNewColumnAPI = createAsyncThunk(
  'createNewColumnAPI',
  async (data: ICreateColumn, { dispatch }) => {
    const columnAPI = await httpClient.createColumn(data.token, data.board.id, data.columnBody);
    if (columnAPI) {
      dispatch(setIsChanged(true));
      dispatch(setCurrentBoard(data.board));
    }
  }
);

export const updateColumnAPI = createAsyncThunk(
  'updateColumnAPI',
  async (data: IUpdateColumn, { dispatch }) => {
    await httpClient.updateColumn(data.token, data.boardId, data.columnId, {
      title: data.columnTitle,
      order: data.columnOrder,
    });
    dispatch(getBoardByIdAPI({ token: data.token, boardId: data.boardId }));
  }
);

export const deleteColumnAPI = createAsyncThunk(
  'createNewColumnAPI',
  async (data: IDeleteColumn, { dispatch }) => {
    try {
      await httpClient.deleteColumn(data.token, data.boardId, data.columnId);
    } catch {}
    dispatch(getBoardByIdAPI({ token: data.token, boardId: data.boardId }));
  }
);

export const deleteAllBoardColumns = createAsyncThunk(
  'deleteAllBoardColumns',
  async (data: IDeleteBoard, { dispatch }) => {
    await httpClient.deleteBoard(data.token, data.boardId);
    dispatch(getAllBoardsFromAPI(data.token));
  }
);

export const createNewTaskAPI = createAsyncThunk(
  'createNewTaskAPI',
  async (data: ICreateTask, { dispatch }) => {
    const tasksAPI = await httpClient.createTask(data.token, data.board.id, data.columnId, {
      title: data.taskTitle,
      order: data.taskOrder,
      description: data.taskDescription,
      userId: data.userId,
    });
    if (tasksAPI) {
      dispatch(
        getAllTasksFromAPI({
          token: data.token,
          boardId: data.board.id,
          columnId: data.columnId,
          exceptOrder: data.taskOrder,
        })
      );

      dispatch(setIsChanged(true));
      dispatch(getBoardByIdAPI({ token: data.token, boardId: data.board.id }));
    }
  }
);

export const updateTaskAPI = createAsyncThunk(
  'updateTaskAPI',
  async (data: IUpdateTaskAPI, { dispatch }) => {
    await httpClient.updateTask(data.token, data.boardId, data.columnId, data.taskId, {
      title: data.taskTitle,
      order: data.taskOrder,
      description: data.taskDescription,
      userId: data.userId,
      boardId: data.boardId,
      columnId: data.columnId,
    });

    dispatch(getBoardByIdAPI({ token: data.token, boardId: data.boardId }));
  }
);

interface ITemp {
  token: string;
  boardId: string;
  columnId: string;
  taskId: string;
  taskTitle: string;
  taskOrder: number;
  taskDescription: string;
  userId: string;
}

export const updateAllTaskAPI = createAsyncThunk(
  'updateAllTaskAPI',
  async (data: IUpdateAllTasks, { dispatch }) => {
    const promiseArray: Array<Promise<ITemp>> = [];
    data.tasksArray.forEach((task) => {
      const dataAnswer = httpClient.updateTask(
        task.token,
        task.boardId,
        task.columnId,
        task.taskId,
        {
          title: task.taskTitle,
          order: task.taskOrder,
          description: task.taskDescription,
          userId: task.userId,
          boardId: task.boardId,
          columnId: task.columnId,
        }
      );
      promiseArray.push(dataAnswer);
    });
    await Promise.all(promiseArray).then(() => {
      dispatch(
        getBoardByIdAPI({ token: data.tasksArray[0].token, boardId: data.tasksArray[0].boardId })
      );
    });
  }
);

export const deleteTaskAPI = createAsyncThunk(
  'deleteTaskAPI',
  async (data: IDeleteTask, { dispatch }) => {
    try {
      await httpClient.deleteTask(data.token, data.boardId, data.columnId, data.taskId);
      dispatch(
        getAllTasksFromAPI({
          token: data.token,
          boardId: data.boardId,
          columnId: data.columnId,
          exceptOrder: -1,
        })
      );
      dispatch(setIsChanged(true));
    } catch {}
    dispatch(getBoardByIdAPI({ token: data.token, boardId: data.boardId }));
  }
);

export const getAllTasksFromAPI = createAsyncThunk(
  'getAllTasksFromAPI',
  async (data: IGetTasks, { dispatch }) => {
    const tasksAPI = await httpClient.getAllTasks(data.token, data.boardId, data.columnId);
    if (tasksAPI) {
      let order = data.exceptOrder === 0 ? 1 : 0;
      const tasksSorted: Array<ITask> = tasksAPI.sort((a: ITask, b: ITask) => a.order - b.order);
      tasksSorted.forEach((task: ITask) => {
        if (task.order === data.exceptOrder) {
          order += 1;
        }
        if (task.order !== order) {
          task.order = order;
          dispatch(
            updateTaskAPI({
              token: data.token,
              boardId: data.boardId,
              columnId: data.columnId,
              taskId: task.id,
              taskTitle: task.title,
              taskOrder: task.order,
              taskDescription: task.description,
              userId: task.userId,
            })
          );
        }
        order += 1;
      });
      dispatch(setAppTasks(tasksSorted));
    }
  }
);

export const deleteTaskAPIwoUpdate = createAsyncThunk(
  'deleteTaskAPIwoUpdate',
  async (data: IDeleteTask, { dispatch }) => {
    try {
      await httpClient.deleteTask(data.token, data.boardId, data.columnId, data.taskId);
      dispatch(setIsChanged(true));
    } catch {}
    dispatch(getBoardByIdAPI({ token: data.token, boardId: data.boardId }));
  }
);

export const dataSlice = createSlice({
  name: 'boardsFunctions',
  initialState,
  reducers: {
    setAppBoards: (state, action) => {
      return { ...state, boardsArray: action.payload };
    },
    setCurrentBoard: (state, action) => {
      return { ...state, currentBoard: action.payload };
    },
    setAppColumns: (state, action) => {
      return { ...state, columnsArray: action.payload };
    },
    setCurrentColumn: (state, action) => {
      return { ...state, currentColumn: action.payload };
    },
    setAppTasks: (state, action) => {
      return { ...state, tasksArray: action.payload };
    },
    setIsChanged: (state, action) => {
      return { ...state, isChanged: action.payload };
    },
    setIsModalOn: (state, action) => {
      return { ...state, isModalOn: action.payload };
    },
  },
});

export const {
  setAppBoards,
  setCurrentBoard,
  setAppColumns,
  setCurrentColumn,
  setAppTasks,
  setIsChanged,
  setIsModalOn,
} = dataSlice.actions;

export default dataSlice.reducer;
