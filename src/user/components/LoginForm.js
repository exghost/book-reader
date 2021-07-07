import { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 

    const onFormSubmit = async (e) => {
        e.preventDefault();
        
        const result = await axios({
            url: 'http://localhost:4056/graphql',
            method: 'post',
            data: {
                query: `
                mutation {
                    login(email: "${email}", password: "${password}") {
                        id
                        email
                    }
                }
                `
            },
            withCredentials: true
        });

        console.log(result);
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
                    {error && <div className="error-container">{error}</div> }
                    <button type="submit" className="form-submit" value="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;