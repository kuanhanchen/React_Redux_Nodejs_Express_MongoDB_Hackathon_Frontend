import React, {Component} from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class NavBar extends Component {

  renderLogin() {
    if(!this.props.user) {
      return (
          <Link to="/login" className="nav-link">LOG IN</Link>
      );
    } else {
        return (
          <a href="/" className="nav-link">LOGOUT</a>
        );
    }
  }

  renderSignup() {
    if(!this.props.user) {
      return (
        <Link to="/signup" ><Button>SIGN UP</Button></Link>
      );
    } 
  }

  render() {
    return (
      <Navbar color="faded" light expand="md">

        <Link to="/" className="mr-auto navbar-brand">Hackathon</Link>
        
        <NavbarToggler onClick={this.props.toggleNavbar} className="mr-2" />

        <Collapse isOpen={!this.props.collapsed} navbar>
          <Nav navbar className="ml-auto">
            <li className="nav-item">
              <Link to="/requestDemo" className="nav-link">Request Demo</Link>
            </li>
            
            <li className="nav-item">
              {this.renderLogin()}
            </li>

            <li className="nav-item">
              {this.renderSignup()}
            </li>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
function mapStateToProps(state) {
  return { 
    user: state.users
   };
}

export default connect(mapStateToProps)(NavBar);
