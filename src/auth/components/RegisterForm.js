import { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(''); 

    const onFormSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            setError('Passwords must match');
            return;
        } else {
            setError('');
        }
        
        const result = await axios({
            url: 'http://localhost:4056/graphql',
            method: 'post',
            data: {
                query: `
                mutation {
                    registerUser(email: "${email}", password: "${password}") {
                        id
                        email
                    }
                }
                `
            }
        });

        console.log(result);
    };

    return (
        <div>
            <form onSubmit={(e) => onFormSubmit(e)}>
                <div className="form-grid-container">
                    <div className="form-header">Registration Form</div>
                    <label htmlFor="userEmail" className="form-grid-item form-label">Email</label>
                    <input type="email" id="userEmail" className="form-grid-item form-field" value={email} onChange={(e) => setEmail(e.target.value)}  />
                    <label htmlFor="userPassword" className="form-grid-item form-label">Password</label>
                    <input type="password" id="userPassword" className="form-grid-item form-field" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="userPasswordConfirm" className="form-grid-item form-label">Confirm Password</label>
                    <input type="password" id="userPasswordConfirm" className="form-grid-item form-field" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    {error && <div className="error-container">{error}</div> }
                    <button type="submit" className="form-submit" value="submit">Register</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;