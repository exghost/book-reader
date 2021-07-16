import { configureStore } from "@reduxjs/toolkit";

import userReducer from 'state/reducers/userSlice';
import booksReducer from 'state/reducers/booksSlice';
import authorsReducer from 'state/reducers/authorsSlice';
import genresReducer from 'state/reducers/genresSlice';
import tagsReducer from 'state/reducers/tagsSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        books: booksReducer,
        authors: authorsReducer,
        genres: genresReducer,
        tags: tagsReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;