import React, {Component} from 'react';
import { Button, Collapse, Card, CardBody, Form, FormGroup, Input, CardTitle, Jumbotron, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createMessage } from '../actions';
import {withRouter} from "react-router-dom";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {collapse: false};
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
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
      this.props.createMessage(values, () => {
          this.props.history.push('/receiveMsg');
      });
  }

  render() {
    return (
      <div>
        <Collapse isOpen={this.state.collapse} className="msgCard">
          <Card>
            <CardBody className="cardTitle">
              <CardTitle>Send us a message!<i className="material-icons msgIcon" onClick={this.toggle}>keyboard_arrow_down</i></CardTitle>
            </CardBody>
            
            <CardBody>
              <Jumbotron>
                We're not available right now, but please leave us a message. We'll get back to you within the next business day.
              </Jumbotron>
            </CardBody>
            
            <CardBody>
              <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              
                <Field
                    label="Name"
                    name="name"
                    type="text"
                    component={this.renderField}
                />

                <Field
                    label="Email"
                    name="email"
                    type="email"
                    component={this.renderField}
                />

                <Field
                    label="Message"
                    name="message"
                    type="text"
                    component={this.renderField}
                />

                <FormGroup>
                    <Button className="orangeColor" size="lg" block disabled={this.props.invalid || this.props.submitting}>Create</Button>
                </FormGroup>
              
              </Form>
            </CardBody>
          </Card>
        </Collapse>

        <Collapse isOpen={!this.state.collapse}>
          <Button className="msg orangeColor" onClick={this.toggle}><i className="material-icons">email</i>Send us a message!</Button> 
        </Collapse> 
      </div>
    );
  }
};


function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = "Name Required";
  }

  if (!values.message) {
    errors.message = "Description Required";
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
  form: 'MessageForm'
})(
    withRouter(connect(mapStateToProps, { createMessage })(Message)
));