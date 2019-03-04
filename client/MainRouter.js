import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';

// eslint-disable-next-line react/prefer-stateless-function
class MainRouter extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}
export default MainRouter;
