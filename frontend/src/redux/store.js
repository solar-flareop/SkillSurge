import { configureStore } from '@reduxjs/toolkit';
import {
  profileReducer,
  subscriptionReducer,
  userReducer,
} from './reducers/userReducer';
import { courseReducer } from './reducers/courseReducer';
import { adminReducer } from './reducers/adminReducer';
import { otherReducer } from './reducers/otherReducer';

export const server = 'https://skillsurge.onrender.com/api/v1';
// export const server = 'http://localhost:5000/api/v1';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    course: courseReducer,
    subscription: subscriptionReducer,
    admin: adminReducer,
    other: otherReducer,
  },
});

export default store;

/*
- in main file the logot cookie change
- deleting admin gets infi loop
- make loder small
- deleting user from dashboard by admin keeps subscription module inchanged
*/
