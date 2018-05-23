import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const SignUpPage = ({ history }) => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} />
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordRepeat: '',
  error: null
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, password } = this.state;

    const { history } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  };

  render() {
    const { username, email, password, passwordRepeat, error } = this.state;

    const isInvalid =
      password !== passwordRepeat ||
      password === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={event =>
            this.setState(byPropKey('username', event.target.value))
          }
          type="text"
          placeholder="Full Name"
        />
        <br />
        <input
          value={email}
          onChange={event =>
            this.setState(byPropKey('email', event.target.value))
          }
          type="text"
          placeholder="Email Address"
        />
        <br />
        <input
          value={password}
          onChange={event =>
            this.setState(byPropKey('password', event.target.value))
          }
          type="password"
          placeholder="Password"
        />
        <br />
        <input
          value={passwordRepeat}
          onChange={event =>
            this.setState(byPropKey('passwordRepeat', event.target.value))
          }
          type="password"
          placeholder="Confirm Password"
        />
        <br />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
