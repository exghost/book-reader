import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchAllGenres } from 'api/bookReader/genres';

const initialState = {
    list: [],
    status: 'idle',
    error: '',
    currentRequestId: undefined
}

export const getAllGenres = createAsyncThunk(
    'genres/getAllGenresStatus',
    async () => {
        return await fetchAllGenres();
    }
);

const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        addGenres(state, action) {
            const newGenres = action.payload.filter(genre => !state.list.includes(genre));

            state.list = [...state.list, ...newGenres];
        }
    },
    extraReducers: {
        [getAllGenres.pending]: (state, { meta } ) => {
            if(
                state.status === 'idle'
            ) {
                state.status = 'loading';
                state.currentRequestId = meta.requestId;
            }
        },
        [getAllGenres.fulfilled]: ( state, { payload, meta } ) => {
            if(
                state.status === 'loading' &&
                state.currentRequestId === meta.requestId
            ) {
                state.list = payload.map(genre => genre.label);
                state.status = 'idle'
                state.currentRequestId = undefined;
                state.error = '';
            }
        },
        [getAllGenres.rejected]: ( state, { error, meta }) => {
            if(
                state.status === 'loading' &&
                state.currentRequestId === meta.requestId
            ) {
                state.error = error.message;
                state.status = 'idle';
                state.currentRequestId = undefined;
            }
        }
    }
});

export const { addGenres } = genresSlice.actions;
export default genresSlice.reducer;