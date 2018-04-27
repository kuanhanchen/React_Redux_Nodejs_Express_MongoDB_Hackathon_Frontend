import React from 'react';
import { Redirect } from 'react-router-dom';

const Home = props => {
  if (props.auth) {
    return <Redirect to={{pathname: '/list'}} />;
  } else {
    // User will be redirected to /login if they go any other page before authentication.
    return <Redirect to={{pathname: '/login'}} />;
  }
};

export default Home;