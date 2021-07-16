import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchAllAuthors } from 'api/bookReader/authors';

const initialState = {
    list: [],
    status: 'idle',
    error: '',
    currentRequestId: undefined
}

export const getAllAuthors = createAsyncThunk(
    'authors/getAllAuthorsStatus',
    async () => {
        return await fetchAllAuthors();
    }
);

const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {
        addAuthors(state, action) {
            const newAuthors = action.payload.filter(author => !state.list.includes(author));

            state.list = [...state.list, ...newAuthors];
        }
    },
    extraReducers: {
        [getAllAuthors.pending]: (state, { meta } ) => {
            if(
                state.status === 'idle'
            ) {
                state.status = 'loadingAuthors';
                state.currentRequestId = meta.requestId;
            }
        },
        [getAllAuthors.fulfilled]: ( state, { payload, meta } ) => {
            if(
                state.status === 'loadingAuthors' &&
                state.currentRequestId === meta.requestId
            ) {
                state.list = payload.map(author => author.name);
                state.status = 'idle'
                state.currentRequestId = undefined;
                state.error = '';
            }
        },
        [getAllAuthors.rejected]: ( state, { error, meta }) => {
            if(
                state.status === 'loadingAuthors' &&
                state.currentRequestId === meta.requestId
            ) {
                state.error = error.message;
                state.status = 'idle';
                state.currentRequestId = undefined;
            }
        }
    }
});

export const { addAuthors } = authorsSlice.actions;
export default authorsSlice.reducer;