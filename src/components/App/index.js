import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import NavBar from 'components/NavBar';
import RegistrationForm from 'components/auth/RegistrationForm';
import Login from 'components/auth/Login';
import AddBook from 'components/books/AddBook';
import BookLibrary from 'components/books/BookLibrary';

function App() {
  return (
    <div>
        <Router>
            <NavBar>
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/register">Register</Link>
            </NavBar>
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
                <Route exact path="/book/add">
                    <AddBook />
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;