import { createSlice } from '@reduxjs/toolkit';
import { TColumns, IColumn } from '../../interface/interfaces';

export const initialState: TColumns = {
  boardColumns: [],
  currentColumn: {} as IColumn,
};

export const columnsSlice = createSlice({
  name: 'boardsFunctions',
  initialState,
  reducers: {
    setCurrentColumn: (state, action) => {
      return { ...state, currentColumn: action.payload };
    },
  },
});

export const { setCurrentColumn } = columnsSlice.actions;

export default columnsSlice.reducer;
