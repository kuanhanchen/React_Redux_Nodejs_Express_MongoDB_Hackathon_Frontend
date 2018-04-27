import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = props => {
	props.logoutHandler();
    return <Redirect to={{pathname: '/'}} />;

};

export default Logout;