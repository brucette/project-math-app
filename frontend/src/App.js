import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Main from 'components/Main';
import Login from 'globalComponents/Login';
import NotFound from 'components/NotFound';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from 'reducers/user';

const reducer = combineReducers({
  user: user.reducer
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path='/' element={<Main />}></Route> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}