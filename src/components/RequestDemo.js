import React, {Component} from 'react';
import { Form, FormGroup, Row, Col, Card, Button, Label, Input } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import normalizePhone from '../components/normalizePhone';
import { connect } from 'react-redux';
import { createUser } from '../actions';
import {withRouter} from "react-router-dom";

import Message from './Message';

class RequestDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {redirect: false, selectedUser: null};
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

  render() {
      return (
        <div>
            <h5 className="text-center" style={{margin: 20}}>CONTACT SALES</h5>
            <h2 className="text-center">Block fraud and grow revenue with machine learning.</h2>
            <Row>
              <Col sm="6">
                <Card body>
                  <Form>
          
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
                      label="Company Name"
                      name="companyName"
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
                      label="Phone Number"
                      name="phone"
                      type="text"
                      component={this.renderField}
                      normalize={normalizePhone}
                    />
                    
                    <Field
                      label="Brief Description Of Your Fraud Problem"
                      name="description"
                      type="textarea"
                      component={this.renderField}
                    />
                  
                    <FormGroup>
                      <Button className="orangeColor" size="lg" block disabled={this.props.invalid || this.props.submitting}>Create</Button>
                    </FormGroup>

                  </Form>
                </Card>
              </Col>

              <Col sm="6">
                <h5 className="text-center">You're in good company</h5>
                <img className="text-center" width="50%" src="http://ustsv.org/assets/img/ustsv_logo.png" alt="USTSV" />
              </Col>

            </Row>

            <Message />
      </div>
      );
  }
}

function validate(values) {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "First Name Required";
  }

  if (!values.lastName) {
    errors.lastName = "Last Name Required";
  }

  if (!values.description) {
    errors.description = "Description Required";
  }

  if (!values.phone) {
    errors.phone = "Office Number Required";
  } else if (values.phone.length < 12) {
    errors.phone = "Incomplete Phone Number";
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
	form: 'UsersNewForm'
})(
	withRouter(connect(mapStateToProps, { createUser })(RequestDemo)
));