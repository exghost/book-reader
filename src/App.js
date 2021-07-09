import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Registration from './user/components/Registration/Registration';
import Login from './user/components/Login/Login';
import AddBook from './book/components/AddBook';

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
        <Route exact path="/book/add">
          <AddBook />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
