import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import resumeReducer from './reducers/resumeSlice';
import profileReducer from './reducers/profileSlice';
import adminReducer from './reducers/adminSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    resume: resumeReducer,
    profile: profileReducer,
    admin: adminReducer
  }
});

export default store;