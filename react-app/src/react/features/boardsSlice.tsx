import { createSlice } from '@reduxjs/toolkit';
import { IBoard, TBoards } from '../../interface/interfaces';
import { boardsArray } from '../../temporary/tempData';

export const initialState: TBoards = {
  // appBoards: [],
  currentBoard: {} as IBoard,
};

/*function findUserBoards() {
  return boardsArray; //API
}*/

export const boardsSlice = createSlice({
  name: 'boardsFunctions',
  initialState,
  reducers: {
    /*  setAppBoards: (state) => {
      return { ...state, appBoards: findUserBoards() };
    },*/
    setCurrentBoard: (state, action) => {
      return { ...state, currentBoard: action.payload };
    },
  },
});

//export const { setAppBoards, setCurrentBoard } = boardsSlice.actions;
export const { setCurrentBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
