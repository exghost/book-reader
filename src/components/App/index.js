import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import NavBar from 'components/NavBar';
import RegistrationForm from 'components/auth/RegistrationForm';
import Login from 'components/auth/Login';
import Logout from 'components/auth/Logout';
import AddBook from 'components/books/AddBook';
import EditBook from 'components/books/EditBook';
import BookLibrary from 'components/books/BookLibrary';

import { checkAuthentication } from 'state/reducers/userSlice';

function App() {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.user.loggedIn);

    useEffect(async () => {
        dispatch(checkAuthentication());
    }, []);

  return (
    <div>
        <Router>
            { !loggedIn && 
                <NavBar>
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link" to="/register">Register</Link>
                </NavBar>
            }
            {
                loggedIn &&
                <NavBar>
                    <Link className="nav-link" to="/books">Library</Link>
                    <Link className="nav-link" to="/books/new">New Book</Link>
                    <Link className="nav-link" to="/logout"> Logout</Link>
                </NavBar>
            }
            <Switch>
                <Route exact path="/">
                    <RegistrationForm />
                </Route>
                <Route exact path="/register">
                    <RegistrationForm />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/books">
                    <BookLibrary />
                </Route>
                <Route exact path="/books/new">
                    <AddBook />
                </Route>
                <Route exact path="/logout">
                    <Logout />
                </Route>
                <Route path="/books/edit/:id">
                    <EditBook />
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;