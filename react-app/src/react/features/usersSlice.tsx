import { createSlice } from '@reduxjs/toolkit';
import { usersArray } from '../../temporary/tempData';
import { IAppUser, TUsers } from '../../interface/interfaces';

export const initialState: TUsers = {
  currentUser: {} as IAppUser,
};

function findUser(userId: string): IAppUser {
  return usersArray.find((item) => item.id == userId) || usersArray[0];
}

export const usersSlice = createSlice({
  name: 'usersFunctions',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      return { ...state, currentUser: findUser(action.payload) };
    },
  },
});

export const { setCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
