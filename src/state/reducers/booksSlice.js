import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addBook, fetchBooksByCurrentUser } from '../../api/bookReader';

const initialState = {
    booksStatus: 'idle', 
    currentRequestId: undefined,
    list: [],
    error: '',
};

export const fetchLibrary = createAsyncThunk(
    'books/fetchLibraryStatus',
    async () => {
        return await fetchBooksByCurrentUser();
    }

);

export const addNewBook = createAsyncThunk(
    'books/addNewBookStatus',
    async({ bookData }) => {
        return await addBook(bookData);
    }
);

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchLibrary.pending]: (state, { meta }) => {
            if(
                state.booksStatus === 'idle'
            ) {
                state.booksStatus = 'loading';
                state.currentRequestId = meta.requestId;
            }
        },
        [fetchLibrary.fulfilled]: (state, { meta, payload }) => {
            if(
                state.booksStatus === 'loading' &&
                state.currentRequestId === meta.requestId
            ) {
                state.list = payload;
                state.booksStatus = 'idle';
                state.currentRequestId = undefined;
                state.error = '';
            }
        },
        [fetchLibrary.rejected]: (state, { meta, error }) => {
            if(
                state.booksStatus === 'loading' &&
                state.currentRequestId === meta.requestId
            ) {
                state.booksStatus = 'idle';
                state.error = error.message;
                state.currentRequestId = undefined;
            }
        },
        [addNewBook.pending]: (state, { meta }) => {
            if(
                state.booksStatus === 'idle'
            ) {
                state.booksStatus = 'uploadingNewBook';
                state.currentRequestId = meta.requestId;
            }
        },
        [addNewBook.fulfilled]: (state, { meta, payload }) => {
            if(
                state.booksStatus === 'uploadingNewBook' &&
                state.currentRequestId === meta.requestId
            ) {
                state.books = [...state.books, payload];
                state.booksStatus = 'idle';
                state.currentRequestId = undefined;
                state.error = '';
            }
        },
        [addNewBook.fulfilled]: (state, { meta, error }) => {
            if(
                state.booksStatus === 'uploadingNewBook' &&
                state.currentRequestId === meta.requestId
            ) {
                state.booksStatus = 'idle';
                state.error = error.message;
                state.currentRequestId = undefined;
            }
        },
    }
}); 

export default booksSlice.reducer;