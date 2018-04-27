import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import Home from './components/Home';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Logout from './components/Logout';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';

class App extends Component {
  constructor(props) {
    super(props);
    // remember that you have to initialize
    // the same data type for the result you want to get in state
    this.state = {data: [], auth: false, collapsed: true, a: false};
  }
  componentDidMount() {
    // componentDidMount is the right place to get some data to render the page
    // https://api.github.com/users?per_page=100
    axios({method: 'get', url: 'https://api.github.com/users?per_page=10'})
      .then(response => {
        this.setState({data: response.data});
      })
      .catch(err => {
        console.log(err);
        alert(err);
      });
  }


  loginHandler = () => {
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
        <div className="container">

          <NavBar toggleNavbar={this.toggleNavbar} auth={this.state.auth} logoutHandler={this.logoutHandler}  />

          <Switch>

            <Route
              exact
              path="/"
              render={() => (
                <Home 
                  auth={this.state.auth}
               />
              )}
            />

            <Route
              path="/login"
              render={() => (
                <Login
                  auth={this.state.auth}
                  loginHandler={this.loginHandler}
                />
              )}
            />

            <Route
              path="/logout"
              render={() => (
                <Logout
                  auth={this.state.auth}
                  logoutHandler={this.logoutHandler}
                />
              )}
            />

            
            <Route
              exact
              path="/list"
              render={({match}) => (
                <UserList 
                  auth={this.state.auth}
                  users={this.state.data} 
                  match={match}
                />
              )}
            />

            <Route
              path={`/list/:userId`}
              render={({match}) => (
                <UserDetail
                  match={match}
                />
              )}
            />

          </Switch>
        
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
