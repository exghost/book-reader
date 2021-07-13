import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from 'prop-types';

import { addNewBook } from 'state/reducers/booksSlice';
import TagInput from 'components/TagInput';

const EditBook = ({ bookData }) => {
    const {
        title,
        isbn,
        edition,
        publishYear,
        authors,
        genres,
        tags
    } = bookData;

    const [removedAuthors, setRemovedAuthors] = useState([]);
    const [removedGenres, setRemovedGenres] = useState([]);
    const [removedTags, setRemovedTags] = useState([]);

    const onSubmitHandler = async(values) => {
        await addNewBook(values);
    }

    return (
        <div className="container-sm">
            <Formik
                initialValues = {
                    {
                        title,
                        isbn,
                        edition,
                        publishYear,
                        authors,
                        genres,
                        tags
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
                            <div className="label">Authors</div>
                            <TagInput 
                                value={authors} 
                                placeholder="Enter author" 
                                name="authors" 
                                tagBackgroundColor="tomato" 
                                data={[]} 
                                onChange={(authors) => formProps.setFieldValue('authors', authors) }
                                onDelete={(author) => setRemovedAuthors(...removedAuthors, author) }
                            />
                        </div>
                        <div className="form-group">
                            <div className="label">Genres</div>
                            <TagInput 
                                value={genres} 
                                placeholder="Enter genre" 
                                name="genres" 
                                data={[]} 
                                onChange={(genres) => formProps.setFieldValue('genres', genres) }
                                onDelete={(genre) => setRemovedGenres(...removedGenres, genre) }
                            />
                        </div>
                        <div className="form-group">
                            <div className="label">Tags</div>
                            <TagInput 
                                value={tags} 
                                placeholder="Enter tag" 
                                name="tags" 
                                tagBackgroundColor="dodgerblue" 
                                data={[]} 
                                onChange={(tags) => formProps.setFieldValue('tags', tags) }
                                onDelete={(tag) => setRemovedTags(...removedTags, tag) }
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

EditBook.propTypes = {
    bookData: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        isbn: PropTypes.string,
        edition: PropTypes.number,
        publishYear: PropTypes.number,
        authors: PropTypes.array,
        genres: PropTypes.array,
        tags: PropTypes.array
    })
}

export default EditBook;