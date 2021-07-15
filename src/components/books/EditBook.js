import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";

import { fetchBook } from 'api/bookReader';
import { editBook } from 'state/reducers/booksSlice';
import TagInput from 'components/TagInput';

const EditBook = () => {
    const { id } = useParams();
   
    const dispatch = useDispatch();
    const error = useSelector(state => state.books.error);

    const [currentBook, setCurrentBook] = useState(undefined);
    const [editComplete, setEditComplete] = useState(false);

    const onSubmitHandler = async(values) => {
        const bookData = {...values, id};
        let result = await dispatch(editBook(bookData));

        if(result.type !== 'books/editBookStatus/rejected') {
            setEditComplete(true);
        }
    }

    useEffect(() => {
        let mounted = true;
        async function fetchBookData() {
            if(mounted) {
                let book = await fetchBook(id);
                book.authors = book.authors.map(author => author.name);
                book.genres = book.genres.map(genre => genre.label);
                book.tags = book.tags.map(tag => tag.label);
                
                await setCurrentBook(book);
            }
        }

        fetchBookData();
        return () => { mounted = false; }
    }, [id]);

    return (
        <div className="container-sm">
            { !currentBook &&
                <div>Loading...</div>
            }
            { currentBook &&
                <Formik
                    initialValues = {
                        {
                            title: currentBook.title,
                            isbn: currentBook.isbn,
                            edition: currentBook.edition,
                            publishYear: currentBook.publishYear,
                            authors: [],
                            genres: [],
                            tags: []
                        }
                    }
                    onSubmit={(values) => {
                        onSubmitHandler(values);
                    }}
                >
                    {(formProps) => (
                        <Form>
                            <div className="form-group">
                                <Field type="text" name="title" placeholder="Book title" />
                                <ErrorMessage name="title" component="div" />
                            </div>
                            <div className="form-group">
                                <Field type="text" name="isbn" placeholder="Book ISBN" />
                                <ErrorMessage name="isbn" component="div" />
                            </div>
                            <div className="form-group">
                                <Field type="text" name="edition" placeholder="Book Edition" />
                                <ErrorMessage name="edition" component="div" />
                            </div>
                            <div className="form-group">
                                <Field type="text" name="publishYear" placeholder="Year Published" />
                                <ErrorMessage name="publishYear" component="div" />
                            </div>
                            <div className="form-group">
                                <TagInput
                                    value={currentBook.authors}
                                    name="authors"
                                    onChange={(authors) => formProps.setFieldValue('authors', authors) }
                                />
                            </div>
                            <div className="form-group">
                                <TagInput
                                    value={currentBook.genres}
                                    name="genres"
                                    onChange={(genres) => formProps.setFieldValue('genres', genres) }
                                />
                            </div>
                            <div className="form-group">
                                <TagInput
                                    value={currentBook.tags}
                                    name="tags"
                                    onChange={(tags) => formProps.setFieldValue('tags', tags) }
                                />
                            </div>
                            <button type="submit">Submit</button>
                            { error && <div>{error}</div>}
                        </Form>
                    )}
                </Formik>
            }
            {
                editComplete &&
                <Redirect to="/books" />
            }
        </div>
    )
}

export default EditBook;