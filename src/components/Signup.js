import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createUser, fetchUser } from '../actions';
import {withRouter} from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', password: '', errMsg:''};
  }

  renderField = (field) => {
    const { meta: { touched, error } } = field;
    
    const inputState = (field) => {
      if (field.meta.touched && field.meta.error) {
        console.log(field.meta.error);
        return 'is-invalid'
      } else if (field.meta.touched && field.input.value) {
        return 'is-valid'
      } else {
        return ''
      }
    }
    return (
      <FormGroup >
        <Label>{field.label} <span style={{color: 'red', fontWeight: 'bold'}}>*</span></Label>
        <Input 
          type={field.type}
          placeholder={field.label}
          {...field.input}
          className={inputState(field)}
          
        />
        {touched && (error && <span className="invalid-feedback">{error}</span>)}
        
      </FormGroup>
    );
    }

    onSubmit = (values) => {
        console.log(values);
        this.props.createUser(
            values, 
            () => {
                this.props.fetchUser(
                    values, 
                    () => {
                        this.props.history.push('/');
                    }
                );
            }
        );
    }


  render() {
    if (this.props.auth) {
      this.props.loginHandler();
      return <Redirect to={{pathname: '/'}} />;
    } else {
      // User will be redirected to /login if they go any other page before authentication.
      return (
        <div style={{marginTop: 50}}>
          <Row>
                
            <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h1 className="text-center">Start your free 30 day trial</h1>
            </Col>
          </Row>

        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>

          <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          
            <Field
              label="First Name"
              name="firstName"
              type="text"
              component={this.renderField}
            />

            <Field
              label="Last Name"
              name="lastName"
              type="text"
              component={this.renderField}
            />

            <Field
              label="Website Address"
              name="website"
              type="text"
              component={this.renderField}
            />

            <Field
              label="Email Address"
              name="email"
              type="email"
              component={this.renderField}
            />

            <Field
              label="Password"
              name="password"
              type="password"
              component={this.renderField}
            />

            <FormGroup>
              <Button className="orangeColor" size="lg" block disabled={this.props.invalid || this.props.submitting}>Create Account</Button>
            </FormGroup>
                  
          </Form>

          </Col>
        </Row>
        </div>
      );
    }
  }
};


function validate(values) {
  const errors = {};
  
  if (!values.firstName) {
    errors.firstName = "First Name Required";
  }

  if (!values.lastName) {
    errors.lastName = "Last Name Required";
  }

  if (!values.website) {
    errors.website = "Website Required";
  }

  if (!values.email) {
    errors.email = "Email Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid Email Address'
  }

  return errors;
}

function mapStateToProps(state) {
  return { 
    // users: state.users
   };
}

export default reduxForm({
  validate,
	form: 'SignupForm'
})(
	withRouter(connect(mapStateToProps, { createUser, fetchUser })(Signup)
));