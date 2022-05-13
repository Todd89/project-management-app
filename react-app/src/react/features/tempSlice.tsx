import { createSlice } from '@reduxjs/toolkit';
import { IBoard, IColumn, ITask } from '../../interface/interfaces';
import { boardsArray, columnsArray, tasksArray } from '../../temporary/tempData';

export interface TempBoards {
  boardsArray: Array<IBoard>;
  columnsArray: Array<IColumn>;
  tasksArray: Array<ITask>;
}

export const initialState: TempBoards = {
  boardsArray: boardsArray,
  columnsArray: columnsArray,
  tasksArray: tasksArray,
};

export const tempSlice = createSlice({
  name: 'boardsFunctions',
  initialState,
  reducers: {
    setTempBoards: (state, action) => {
      return { ...state, boardsArray: action.payload };
    },
    setTempColumns: (state, action) => {
      return { ...state, columnsArray: action.payload };
    },
    setTempTasks: (state, action) => {
      console.log('spice');
      return { ...state, tasksArray: action.payload };
    },
  },
});

export const { setTempBoards, setTempColumns, setTempTasks } = tempSlice.actions;

export default tempSlice.reducer;
