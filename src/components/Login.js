import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', password: '', errMsg:''};
  }

  onSubmit = e => {
    e.preventDefault();
    if(this.state.name === 'username' && this.state.password === 'password') {
      this.props.loginHandler();
    } else {
      this.setState({errMsg: 'Invalid username / password pair'});
    }
  }

  onChange = e => {
    let state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleValidation = () => {
    if(this.state.name === 'username' && this.state.password === 'password') {
      this.setState({isValid: true});
    }
  }


  render() {
    if (this.props.auth) {
      this.props.loginHandler();
      return <Redirect to={{pathname: '/'}} />;
    } else {
      // User will be redirected to /login if they go any other page before authentication.
      return (
        <Form onSubmit={this.onSubmit}>
          <h2>Login Page</h2>
        
          <h4 className="text-xs-center bg-danger">{this.state.errMsg}</h4>
          
          <FormGroup>
            <Label>USERNAME</Label>
            <Input type="text" placeholder="USERNAME" name="name" value={this.state.fName} onChange={this.onChange} required />
          </FormGroup>

          <FormGroup>
            <Label>PASSWORD</Label>
            <Input type="password" placeholder="PASSWORD" name="password" value={this.state.password} onChange={this.onChange} required />
          </FormGroup>

          <Button color="primary">Login</Button>
        </Form>
      );
    }
  }
};

export default Login;