import { configureStore } from "@reduxjs/toolkit";

import userReducer from '../user/reducers/userSlice';
import booksReducer from "../book/reducers/booksSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        books: booksReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;