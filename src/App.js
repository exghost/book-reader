import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Registration from './user/components/Registration/Registration';
import LoginForm from './user/components/LoginForm';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Registration />
        </Route>
        <Route exact path="/login">
          <LoginForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
