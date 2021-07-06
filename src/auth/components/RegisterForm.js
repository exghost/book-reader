import './RegisterForm.css';

const RegisterForm = () => {
    return (
        <div>
            <form>
                <div className="form-grid-container">
                    <div className="form-header">Registration Form</div>
                    <label for="userEmail" className="form-grid-item form-label">Email</label>
                    <input type="email" id="userEmail" className="form-grid-item form-field" />
                    <label for="userPassword" className="form-grid-item form-label">Password</label>
                    <input type="password" id="userPassword" className="form-grid-item form-field" />
                    <label for="userPasswordConfirm" className="form-grid-item form-label">Confirm Password</label>
                    <input type="password" id="userPasswordConfirm" className="form-grid-item form-field" />
                    <button type="submit" className="form-submit">Register</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;