import { createSlice } from '@reduxjs/toolkit';

type UserState = {
  isAuthorized: boolean;
};

const initialState: UserState = {
  isAuthorized: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn(state) {
      state.isAuthorized = true;
    },
    logOut(state) {
      state.isAuthorized = false;
    },
  },
});

export const { logIn } = userSlice.actions;

export default userSlice.reducer;
