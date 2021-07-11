import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Registration from './user/components/Registration/Registration';
import Login from './user/components/Login/Login';
import AddBook from './book/components/AddBook';
import BookLibrary from './book/components/BookLibrary';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Registration />
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
