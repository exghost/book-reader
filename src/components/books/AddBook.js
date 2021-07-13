import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";

import { addNewBook } from 'state/reducers/booksSlice';
import TagInput from 'components/TagInput';

const AddBook = () => {
    const [authors] = useState([]);
    const [genres] = useState([]);
    const [tags] = useState([]);

    const onSubmitHandler = async(values) => {
        await addNewBook(values);
    }
/*
    const clearForm = (values) => {
        values.title = '';
        values.isbn = '';
        values.edition = '';
        values.publishYear = '';
        values.bookFile = '';
        setAuthors([]);
        setGenres([]);
        setTags([]);
    }
*/
    return (
        <div className="container-sm">
            <Formik
                initialValues = {
                    {
                        title: '',
                        isbn: '',
                        edition: '',
                        publishYear: '',
                        bookFile: '',
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
                            <TagInput value={authors} placeholder="Enter author" name="authors" tagBackgroundColor="tomato" data={["Robin Nixon"]} onChange={(authors) => formProps.setFieldValue('authors', authors) } />
                        </div>
                        <div className="form-group">
                            <div className="label">Genres</div>
                            <TagInput value={genres} placeholder="Enter genre" name="genres" data={[]} onChange={(genres) => formProps.setFieldValue('genres', genres) } />
                        </div>
                        <div className="form-group">
                            <div className="label">Tags</div>
                            <TagInput value={tags} placeholder="Enter tag" name="tags" tagBackgroundColor="dodgerblue" data={[]} onChange={(tags) => formProps.setFieldValue('tags', tags) } />
                        </div>
                        <div className="form-group">
                            <input type="file" name="bookFile" onChange={(e) => formProps.setFieldValue("bookFile", e.target.files[0]) } />
                        </div>
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddBook;