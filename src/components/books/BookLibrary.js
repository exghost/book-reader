import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLibrary } from 'state/reducers/booksSlice';
import LibraryRow from 'components/books/LibraryRow';

const BookLibrary = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.books.list);

    useEffect(async () => {
        dispatch(fetchLibrary());
    }, []);

    return (
        <div className="dark">
            <div className="table-responsive">
                <table className="library table table-dark table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">ISBN</th>
                            <th scope="col">Edition</th>
                            <th scope="col">Publish Year</th>
                            <th scope="col">Author(s)</th>
                            <th scope="col">Genre(s)</th>
                            <th scope="col">Tags</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        { books && books.map((book) => (
                            <LibraryRow key={book.id} bookData={book} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BookLibrary