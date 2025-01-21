// expertStore.js

import { createSlice } from '@reduxjs/toolkit';

const expertSlice = createSlice({
  name: 'expert',
  initialState: {
    email: null,
    uid: null,
    isLoggedIn: false,
  },
  reducers: {
    setExpertLogin: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.isLoggedIn = true;
    },
    setExpertLogout: (state) => {
      state.email = null;
      state.uid = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setExpertLogin, setExpertLogout } = expertSlice.actions;

export default expertSlice.reducer;
