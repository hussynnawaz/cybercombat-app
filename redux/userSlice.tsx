// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    uid: '',
    name: '',  // This should be the name field from Firebase
    isLoggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.name = action.payload.name || '';  // Ensure this is set
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.email = '';
      state.uid = '';
      state.name = '';
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
