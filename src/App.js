import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import Home from './components/Home';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Signup from './components/Signup';
import RequestDemo from './components/RequestDemo';
import ReceiveMsg from './components/ReceiveMsg';
import Service from './components/Service';


class App extends Component {
  constructor(props) {
    super(props);
    // remember that you have to initialize
    // the same data type for the result you want to get in state
    this.state = {data: [], auth: false, collapsed: true, a: false};
  }
  
  loginHandler = () => {
    this.setState({auth: true});
  };

  signupHandler = () => {
    this.setState({auth: true});
  };

  logoutHandler = () => {
    this.setState({auth: false});
  };

  toggleNavbar = () => {
    this.setState({collapsed: !this.state.collapsed});
  }

  render() {
    return (
      <BrowserRouter>
        <div>

          <NavBar toggleNavbar={this.toggleNavbar} collapsed={this.state.collapsed} logoutHandler={this.logoutHandler}  />

          <Switch>

            <Route
              exact
              path="/"
              render={() => (
                <Home />
              )}
            />

            <Route
              path="/login"
              render={() => (
                <Login
                  loginHandler={this.loginHandler}
                />
              )}
            />

            <Route
              path="/signup"
              render={() => (
                <Signup
                  signupHandler={this.signupHandler}
                />
              )}
            />

            
            <Route
              exact
              path="/requestDemo"
              render={() => (
                <RequestDemo />
              )}
            />

            <Route
              exact
              path="/receiveMsg"
              render={() => (
                <ReceiveMsg />
              )}
            />

            <Route
              path="/service"
              render={() => (
                <Service />
              )}
            />

          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
