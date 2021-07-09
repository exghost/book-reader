import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import RegistrationForm from './RegistrationForm';

const Registration = () => {
    const registrationComplete = useSelector(state => state.user.registrationComplete);
    const isLoggedIn = useSelector(state => state.user.loggedIn);

    return (
        <div>
            {!registrationComplete && !isLoggedIn && <RegistrationForm /> }
            {registrationComplete && 
                <div>
                    <h3>Registration Successful!</h3>
                    <Link to='/login'>Login?</Link>
                </div>
            }
        </div>
    );
}

export default Registration;