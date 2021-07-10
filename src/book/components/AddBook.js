import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";

import { addBook } from "../../api/bookReader";
import TagInput from "../../util/components/TagInput";


const AddBook = () => {
    const onSubmitHandler = async(values) => {
        console.log(values);
        await addBook(values);
    }

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
                        authors: []
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
                            <TagInput placeholder="Enter author" name="authors" />
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