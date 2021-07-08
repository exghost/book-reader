import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../api/bookReader';

const initialState = {
    login: 'idle', 
    currentRequestId: undefined,
    userData: {},
    error: ''
};

export const loginUser = createAsyncThunk(
    'user/loginStatus',
    async(credentials) => {
        let response;
        try {
            response = await login(credentials.email, credentials.password);
        } catch(err) {
            throw err;
        } 
        return response;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [loginUser.fulfilled]: (state, { meta, payload }) => {
            if(
                state.login === 'pending' &&
                state.currentRequestId === meta.requestId
            ) {
                state.userData = payload;
                state.login = 'idle';
                state.currentRequestId = undefined;
            }
        },
        [loginUser.pending]: (state, { meta }) => {
            if(state.login === 'idle') {
                state.login = 'pending';
                state.currentRequestId = meta.requestId;
            }
        },
        [loginUser.rejected]: (state, { meta, error }) => {
            if(
                state.login === 'pending' &&
                state.currentRequestId === meta.requestId
            ) {
                state.login = 'idle';
                state.error = error.message;
                state.currentRequestId = undefined;
            }
        }
    }
}); 

export default userSlice.reducer;