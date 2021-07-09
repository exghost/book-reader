import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import { loginUser } from '../../reducers/userSlice';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().required('Required')
});

const LoginForm = () => {
    const dispatch = useDispatch();
    const authStatus = useSelector(state => state.user.authStatus);
    const loginError = useSelector(state => state.user.error);

    const onSubmitHandler = async (values) => {
        if(authStatus === 'idle') {
            dispatch(loginUser(values));
        }
    };

    return (
        <div className="container-sm">
            <h3>Login</h3>
            <Formik
                initialValues= {
                    {
                        email: '',
                        password: ''
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
                    {loginError && <div className="error-container">{loginError}</div> }
                    <button type="submit" disabled={authStatus !== 'idle' ? true : false} className="btn btn-primary">Login</button>
                </Form>
            </Formik>

        </div>
    );
};

export default LoginForm;