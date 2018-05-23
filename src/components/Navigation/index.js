import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';

import SignOutButton from '../SignOut';

const Navigation = ({ authUser }) => (
  <React.Fragment>
    {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
  </React.Fragment>
);

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={routes.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={routes.HOME}>Home</Link>
    </li>
    <li>
      <Link to={routes.ACCOUNT}>Account</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={routes.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={routes.SIGN_IN}>Sign in</Link>
    </li>
  </ul>
);

export default Navigation;
