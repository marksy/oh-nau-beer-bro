import React from 'react';

import withAuthorization from '../../hoc/withAuthorization';

const HomePage = () => (
  <div>
    <h1>home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage);
