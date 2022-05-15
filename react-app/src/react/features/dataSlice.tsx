import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from '../../API/api';
import {
  IBoard,
  IBoardTempColumn,
  IColumn,
  ICreateBoard,
  ICreateColumn,
  IDeleteBoard,
  IDeleteColumn,
  IGetAllColumns,
  IGetBoard,
  IGetBoardColumns,
  IShortBoard,
  ITask,
  ITempColumn,
} from '../../interface/interfaces';
import { INewBoard } from '../../interface/types';
import { tasksArray } from '../../temporary/tempData';

export interface DataBoards {
  boardsArray: Array<IShortBoard>;
  currentBoard: IBoard;
  columnsArray: Array<ITempColumn>;
  currentColumn: IColumn;
  tasksArray: Array<ITask>;
  isChanged: boolean;
}

export const initialState: DataBoards = {
  //boardsArray: boardsArray,
  //columnsArray: columnsArray,
  boardsArray: [],
  currentBoard: { id: '', title: '', columns: [] },
  columnsArray: [],
  currentColumn: { id: '', title: '', order: 0, tasks: [] },
  tasksArray: tasksArray,
  isChanged: false,
};

export const getAllBoardsFromAPI = createAsyncThunk(
  'getAllBoardsFromAPI',
  async (token: string, { dispatch }) => {
    const boardsAPI = await httpClient.getAllBoards(token);
    //console.log('getAllBoardsFromAPI', boardsAPI);
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

      // console.log('createNewBoardAPI', boardAPI);
    }
  }
);

export const getBoardByIdAPI = createAsyncThunk(
  'getBoardByIdAPI',
  async (data: IGetBoard, { dispatch }) => {
    const boardAPI = await httpClient.getBoardByID(data.token, data.boardId);
    if (boardAPI) {
      console.log('getBoardByIdAPI');
      dispatch(setCurrentBoard(boardAPI));
      //('getBoardByIdAPI', boardAPI);
      // console.log('getBoardByIdAPI', boardAPI);
    }
  }
);

/*export const getAllColumnsFromAPI = createAsyncThunk(
  'getAllBoardColumnsFromAPI',
  async (data: IGetAllColumns, { dispatch }) => {
    const allBoardsColumns: Array<IBoardTempColumn> = [];
    data.boards.map(async (board) => {
      const boardColumnsAPI = await httpClient.getAllColumns(data.token, board.id);
      //boardColumnsAPI.array.forEach((columnApi: ITempColumn) => {
      console.log('boardColumnsAPI', { boardId: board.id, columns: boardColumnsAPI });
      allBoardsColumns.push({ boardId: board.id, columns: boardColumnsAPI });
      //});
    });
    dispatch(setAppColumns(allBoardsColumns));
  }
);*/

export const getBoardColumnsFromAPI = createAsyncThunk(
  'getBoardColumnsFromAPI',
  async (data: IGetBoardColumns, { dispatch }) => {
    // const allBoardsColumns: Array<IBoardTempColumn> = [];

    const boardColumnsAPI = await httpClient.getAllColumns(data.token, data.boardId);
    //boardColumnsAPI.array.forEach((columnApi: ITempColumn) => {
    // console.log('boardColumnsAPI', { boardId: data.boardId, columns: boardColumnsAPI });
    // allBoardsColumns.push({ boardId: data.boardId, columns: boardColumnsAPI });
    //});

    dispatch(setAppColumns(boardColumnsAPI));
  }
);

export const createNewColumnAPI = createAsyncThunk(
  'createNewColumnAPI',
  async (data: ICreateColumn, { dispatch }) => {
    const columnAPI = await httpClient.createColumn(data.token, data.board.id, data.columnBody);
    if (columnAPI) {
      console.log('createNewColumnAPI');
      dispatch(setIsChanged(true));
      dispatch(setCurrentBoard(data.board));
    }
  }
);

export const deleteColumnAPI = createAsyncThunk(
  'createNewColumnAPI',
  async (data: IDeleteColumn, { dispatch }) => {
    try {
      await httpClient.deleteColumn(data.token, data.boardId, data.columnId);
      console.log('deleteColumnAPI');
    } catch {}
    dispatch(getBoardByIdAPI({ token: data.token, boardId: data.boardId }));
    //dispatch(setCurrentBoard(data.boardId));
  }
);

export const deleteAllBoardColumns = createAsyncThunk(
  'deleteAllBoardColumns',
  async (data: IDeleteBoard, { dispatch }) => {
    // const boardAPI = await httpClient.getBoardByID(data.token, data.boardId);
    console.log('data.boardId', data.boardId);
    /*  boardAPI.columns.forEach((column: IColumn) => {
      console.log('delete another column');
      dispatch(deleteColumnAPI({ token: data.token, boardId: data.boardId, columnId: column.id }));
    });*/
    await httpClient.deleteBoard(data.token, data.boardId);
    dispatch(getAllBoardsFromAPI(data.token));
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
  },
});

export const {
  setAppBoards,
  setCurrentBoard,
  setAppColumns,
  setCurrentColumn,
  setAppTasks,
  setIsChanged,
} = dataSlice.actions;

export default dataSlice.reducer;
