import { configureStore } from "@reduxjs/toolkit";

import userReducer from 'state/reducers/userSlice';
import booksReducer from 'state/reducers/booksSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        books: booksReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;