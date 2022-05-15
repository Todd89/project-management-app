import { createSlice } from '@reduxjs/toolkit';
import { IBoard, TBoards } from '../../interface/interfaces';

export const initialState: TBoards = {
  currentBoard: {} as IBoard,
};

export const boardsSlice = createSlice({
  name: 'boardsFunctions',
  initialState,
  reducers: {
    setCurrentBoard: (state, action) => {
      return { ...state, currentBoard: action.payload };
    },
  },
});

export const { setCurrentBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
