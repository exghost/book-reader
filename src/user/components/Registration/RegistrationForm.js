import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import { registerNewUser } from '../../reducers/userSlice';



const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().required('Required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

const RegistrationForm = () => {
    const dispatch = useDispatch();
    const authStatus = useSelector(state => state.user.authStatus);
    const registerError = useSelector(state => state.user.error);
    

    const onSubmitHandler = async (values) => {
        if(authStatus === 'idle') {
            dispatch(registerNewUser(values));
        }
    };

    return (
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
                    {registerError && <div className="error-container">{registerError}</div> }
                    <button type="submit" disabled={authStatus !== 'idle' ? true : false} className="btn btn-primary">Register</button>
                </Form>
            </Formik> 
        </div>
    );
};

export default RegistrationForm;