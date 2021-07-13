import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import RegistrationForm from 'components/auth/RegistrationForm';
import Login from 'components/auth/Login';
import AddBook from 'components/books/AddBook';
import BookLibrary from 'components/books/BookLibrary';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
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
  );
}

export default App;
