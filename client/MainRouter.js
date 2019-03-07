import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Users from './user/Users';
import Home from './core/Home';
import Signup from './user/Signup';

// eslint-disable-next-line react/prefer-stateless-function
class MainRouter extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    );
  }
}
export default MainRouter;
