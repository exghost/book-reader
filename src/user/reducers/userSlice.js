import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, registerUser } from '../../api/bookReader';

const initialState = {
    authStatus: 'idle', 
    currentRequestId: undefined,
    userData: {},
    loggedIn: false,
    error: ''
};

export const loginUser = createAsyncThunk(
    'user/loginStatus',
    async({ email, password }) => {
        let response;
        try {
            response = await login(email, password);
        } catch(err) {
            throw err;
        } 
        return response;
    }
);

export const registerNewUser = createAsyncThunk(
    'user/registerStatus',
    async ({ email, password }) => {
        let response;
        try {
            response = await registerUser(email, password);
        } catch(err) {
            throw err;
        }

        return response;
    }

)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [loginUser.pending]: (state, { meta }) => {
            if(
                state.authStatus === 'idle' &&
                !state.loggedIn
            ) {
                state.authStatus = 'loggingIn';
                state.currentRequestId = meta.requestId;
            }
        },
        [loginUser.fulfilled]: (state, { meta, payload }) => {
            if(
                state.authStatus === 'loggingIn' &&
                state.currentRequestId === meta.requestId
            ) {
                state.userData = payload;
                state.authStatus = 'idle';
                state.currentRequestId = undefined;
                state.error = '';
                state.loggedIn = true;
            }
        },
        [loginUser.rejected]: (state, { meta, error }) => {
            if(
                state.authStatus === 'loggingIn' &&
                state.currentRequestId === meta.requestId
            ) {
                state.authStatus = 'idle';
                state.error = error.message;
                state.currentRequestId = undefined;
            }
        },
        [registerUser.pending]: (state, { meta }) => {
            if(
                state.authStatus === 'idle' &&
                !state.loggedIn
            ) {
                state.authStatus = 'registering';
                state.currentRequestId = meta.requestId;
            }
        },
        [registerUser.fulfilled]: (state, { meta, payload }) => {
            if(
                state.authStatus === 'registering' &&
                state.currentRequestId === meta.requestId
            ) {
                state.authStatus = 'idle';
                state.currentRequestId = undefined;
                state.error = '';
            }
        },
        [registerUser.rejected]: (state, { meta, error }) => {
            if(
                state.authStatus === 'registering' &&
                state.currentRequestId === meta.requestId
            ) {
                state.authStatus = 'idle';
                state.error = error.message;
                state.currentRequestId = undefined;
            }
        },
    }
}); 

export default userSlice.reducer;