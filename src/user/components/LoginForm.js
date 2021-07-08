import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { loginUser } from '../reducers/userSlice';
import './RegisterForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 

    const dispatch = useDispatch();
    const loginStatus = useSelector(state => state.user.login);
    const loginError = useSelector(state => state.user.error);

    const onFormSubmit = async (e) => {
        e.preventDefault();

        if(loginStatus === 'idle') {
            dispatch(loginUser({email, password}));
        }
    };

    return (
        <div>
            <form onSubmit={(e) => onFormSubmit(e)}>
                <div className="form-grid-container">
                    <div className="form-header">Login Form</div>
                    <label htmlFor="userEmail" className="form-grid-item form-label">Email</label>
                    <input type="email" id="userEmail" className="form-grid-item form-field" value={email} onChange={(e) => setEmail(e.target.value)}  />
                    <label htmlFor="userPassword" className="form-grid-item form-label">Password</label>
                    <input type="password" id="userPassword" className="form-grid-item form-field" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {loginError && <div className="error-container">{loginError}</div> }
                    <button type="submit" className="form-submit" value="submit">Login</button>
                    {}
                </div>
            </form>
        </div>
    );
};

export default LoginForm;