import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from './LoginForm';

const Registration = () => {
    const isLoggedIn = useSelector(state => state.user.loggedIn);

    return (
        <div>
            { !isLoggedIn && <LoginForm /> }
            { isLoggedIn && 
                <Redirect to='/book/add' />
            }
        </div>
    );
}

export default Registration;