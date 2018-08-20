import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Base from './Base';

// Pure Componet
const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={x => <Base {...x} page="Home" />} />
      <Route exact path="/list" render={x => <Base {...x} page="List" />} />
      <Route render={x => <Base {...x} />} />
    </Switch>
  </Router>
);

export default App;
