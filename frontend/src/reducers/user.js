import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // username: null,
  email: null,
  id: null,
  accessToken: null,
  error: null
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setUserEmail: (store, action) => {
      store.email = action.payload;
    },
    setId: (store, action) => {
      store.id = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    logOut: () => {
      return initialState;
    }
  }
});

export default user;
