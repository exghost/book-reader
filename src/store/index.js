import { configureStore } from "@reduxjs/toolkit";

import userReducer from '../user/reducers/userSlice';

const store = configureStore({
    reducer: {
        user: userReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;