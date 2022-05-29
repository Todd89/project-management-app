import { createSlice } from '@reduxjs/toolkit';
import { ILanguage } from '../../interface/types';

export const initialState = {
  language: 'English',
};

export const languageSlice = createSlice({
  name: 'usersFunctions',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      return { ...state, language: action.payload };
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
