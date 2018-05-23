import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { firebase } from './firebase';

import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import PasswordForgetPage from './components/PasswordForgetPage';
import HomePage from './components/HomePage';
import AccountPage from './components/AccountPage';

import * as routes from './constants/routes';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Navigation authUser={this.state.authUser} />

          <hr />

          <Route
            exact
            path={routes.LANDING}
            component={() => <LandingPage />}
          />
          <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
          <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
          <Route
            exact
            path={routes.PASSWORD_FORGET}
            component={() => <PasswordForgetPage />}
          />
          <Route exact path={routes.HOME} component={() => <HomePage />} />
          <Route
            exact
            path={routes.ACCOUNT}
            component={() => <AccountPage />}
          />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
