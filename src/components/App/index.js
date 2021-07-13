import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import NavBar from 'components/NavBar';
import RegistrationForm from 'components/auth/RegistrationForm';
import Login from 'components/auth/Login';
import Logout from 'components/auth/Logout';
import AddBook from 'components/books/AddBook';
import BookLibrary from 'components/books/BookLibrary';

function App() {
    const loggedIn = useSelector(state => state.user.loggedIn);

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
                <Route exact path="/books/add">
                    <AddBook />
                </Route>
                <Route exact path="/logout">
                    <Logout />
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;