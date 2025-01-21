import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import expertReducer from './expertSlice'; // Import expert slice

const store = configureStore({
  reducer: {
    user: userReducer,
    expert: expertReducer, // Add expert reducer
  },
});

export default store;
