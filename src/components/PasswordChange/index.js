import React, { Component } from 'react';

import { auth } from '../../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  password: '',
  passwordRepeat: '',
  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { password } = this.state;

    auth
      .doPasswordUpdate(password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  };

  render() {
    const { password, passwordRepeat, error } = this.state;

    const isInvalid = password !== passwordRepeat || password === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={password}
          onChange={event =>
            this.setState(byPropKey('password', event.target.value))
          }
          type="password"
          placeholder="New Password"
        />
        <input
          value={passwordRepeat}
          onChange={event =>
            this.setState(byPropKey('passwordRepeat', event.target.value))
          }
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default PasswordChangeForm;
