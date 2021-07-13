import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import { registerUser } from 'api/bookReader';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().required('Required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

const RegistrationForm = () => {
    const [registrationStatus, setRegistrationStatus] = useState('idle');
    const [error, setError] = useState('');
    

    const onSubmitHandler = async ({ email, password }) => {
        let response;
        try {
            setRegistrationStatus('pending');
            response = await registerUser(email, password);
        } catch(err) {
            setRegistrationStatus('idle');
            setError(err.message);
        }

        if(response) setRegistrationStatus('complete');
    };

    return (
    <div>
        { registrationStatus !== 'complete' &&
            <div className="container-sm">
                <h3>Register</h3>
                <Formik
                    initialValues= {
                        {
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }
                    }
                    validationSchema={schema}
                    onSubmit={(values) => {
                        onSubmitHandler(values);
                    }}
                >
                    <Form>
                        <div className="form-group">
                            <Field type="email" name="email" placeholder="Email address" className="form-control" />
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <div className="form-group">
                            <Field type="password" name="password" placeholder="Password" className="form-control" />
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <div className="form-group">
                            <Field type="password" name="confirmPassword" placeholder="Confirm Password" className="form-control" />
                            <ErrorMessage name="confirmPassword" component="div" />
                        </div>
                        {error && <div className="error-container">{error}</div> }
                        <button type="submit" disabled={registrationStatus !== 'idle' ? true : false} className="btn btn-primary">Register</button>
                    </Form>
                </Formik> 
            </div>
        }
        {
            registrationStatus === 'complete' && 
            <div>
                <h3>Registration Successful!</h3>
                <Link to='/login'>Login?</Link>
            </div>
        }
    </div>
    );
};

export default RegistrationForm;