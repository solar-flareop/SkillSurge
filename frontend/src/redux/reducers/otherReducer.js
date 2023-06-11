import { createReducer } from '@reduxjs/toolkit';

export const otherReducer = createReducer(
  {},
  {
    contactRequestRequest: state => {
      state.loading = true;
    },
    contactRequestSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    contactRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    courseRequestRequest: state => {
      state.loading = true;
    },
    courseRequestSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    courseRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);
