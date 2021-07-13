import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logoutUser } from 'state/reducers/userSlice';

const Logout = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.user.loggedIn);
    const error = useSelector(state => state.error);

    const logout = () => {
        dispatch(logoutUser());
    }

    const retryLogout = () => {
        logout();
    }

    useEffect(() => {
        logout();
    }, []);

    return (
        <div>
            { loggedIn && !error &&
                <div>Logging out...</div>
            }
            {
                loggedIn && error &&
                <div>
                    <div>{error}</div>
                    <button onClick={retryLogout}>Try Again?</button>
                </div>
            }
            { !loggedIn && 
                <Redirect to='/login' />
            }
        </div>
    );
}

export default Logout;