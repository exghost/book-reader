import { configureStore } from "@reduxjs/toolkit";

import userReducer from 'state/reducers/userSlice';
import booksReducer from 'state/reducers/booksSlice';
import authorsReducer from "./reducers/authorsSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        books: booksReducer,
        authors: authorsReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;