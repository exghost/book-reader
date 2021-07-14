import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { login, invalidateTokens, getCurrentUser } from 'api/bookReader';


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
        response = await login(email, password);
        return response;
    }
);

export const logoutUser = createAsyncThunk(
    'user/logoutStatus',
    async() => {
        let response;
        response = await invalidateTokens();
        return response;
    }
)

export const checkAuthentication = createAsyncThunk(
    'user/checkAuthStatus',
    async() => {
        return await getCurrentUser();
    }
);

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
        [logoutUser.pending]: (state, { meta }) => {
            if(
                state.authStatus === 'idle' &&
                state.loggedIn
            ) {
                state.authStatus = 'loggingOut',
                state.currentRequestId = meta.requestId;
            }
        },
        [logoutUser.fulfilled]: (state, { meta }) => {
            if(
                state.authStatus === 'loggingOut' &&
                state.currentRequestId === meta.requestId
            ) {
                state.loggedIn = false;
                state.authStatus = 'idle';
                state.currentRequestId = undefined;
                state.error = '';
                state.userData = {};
            }
        },
        [logoutUser.rejected]: (state, { meta, error }) => {
            if(
                state.authStatus === 'loggingOut' &&
                state.currentRequestId === meta.requestId
            ) {
                state.authStatus = 'idle';
                state.error = error.message;
                state.currentRequestId = undefined;
            }
        },
        [checkAuthentication.pending]: (state, { meta }) => {
            if(
                state.authStatus === 'idle'
            ) {
                state.authStatus = 'checkingAuth';
                state.currentRequestId = meta.requestId;
            }
        },
        [checkAuthentication.fulfilled]: (state, { meta, payload }) => {
            if(
                state.authStatus === 'checkingAuth' &&
                state.currentRequestId === meta.requestId
            ) {
                state.loggedIn = !!payload;
                state.userData = state.loggedIn ? payload : {};
                state.authStatus = 'idle';
                state.currentRequestId = undefined;
                state.error = '';
            }
        },
        [checkAuthentication.rejected]: (state, { meta }) => {
            if(
                state.authStatus === 'checkingAuth' &&
                state.currentRequestId === meta.requestId
            ) {
                state.authStatus = 'idle';
                state.loggedIn = false;
                state.currentRequestId = undefined;
                state.userData = {};
            }
        }
    }
}); 

export default userSlice.reducer;