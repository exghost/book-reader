import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchAllTags } from 'api/bookReader/tags';

const initialState = {
    list: [],
    status: 'idle',
    error: '',
    currentRequestId: undefined
}

export const getAllTags = createAsyncThunk(
    'tags/getAllTagsStatus',
    async () => {
        return await fetchAllTags();
    }
);

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        addTags(state, action) {
            const newTags = action.payload.filter(tag => !state.list.includes(tag));

            state.list = [...state.list, ...newTags];
        }
    },
    extraReducers: {
        [getAllTags.pending]: (state, { meta } ) => {
            if(
                state.status === 'idle'
            ) {
                state.status = 'loading';
                state.currentRequestId = meta.requestId;
            }
        },
        [getAllTags.fulfilled]: ( state, { payload, meta } ) => {
            if(
                state.status === 'loading' &&
                state.currentRequestId === meta.requestId
            ) {
                state.list = payload.map(tag => tag.label);
                state.status = 'idle'
                state.currentRequestId = undefined;
                state.error = '';
            }
        },
        [getAllTags.rejected]: ( state, { error, meta }) => {
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

export const { addTags } = tagsSlice.actions;
export default tagsSlice.reducer;