import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
    addBook, 
    fetchBooksByCurrentUser, 
    updateBook 
} from 'api/bookReader/books';

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

export const editBook = createAsyncThunk(
    'books/editBookStatus',
    async(values) => {
        return await updateBook(values);
    }
)

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
                state.list = [...state.books, payload];
                state.booksStatus = 'idle';
                state.currentRequestId = undefined;
                state.error = '';
            }
        },
        [addNewBook.rejected]: (state, { meta, error }) => {
            if(
                state.booksStatus === 'uploadingNewBook' &&
                state.currentRequestId === meta.requestId
            ) {
                state.booksStatus = 'idle';
                state.error = error.message;
                state.currentRequestId = undefined;
            }
        },
        [editBook.pending]: (state, { meta }) => {
            if(
                state.booksStatus === 'idle'
            ) {
                state.booksStatus = 'editingBook';
                state.currentRequestId = meta.requestId;
            }
        },
        [editBook.fulfilled]: (state, { meta, payload }) => {
            if(
                state.booksStatus === 'editingBook' &&
                state.currentRequestId === meta.requestId
            ) {
                state.list = state.list.map(book => {
                    if(book.id === payload.id) return payload;
                    return book;
                });
                state.booksStatus = 'idle';
                state.currentRequestId = undefined;
                state.error = '';
            }
        },
        [editBook.rejected]: (state, { meta, error }) => {
            if(
                state.booksStatus === 'editingBook' &&
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