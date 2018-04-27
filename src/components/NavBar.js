import React, {Component} from 'react';
import { Collapse, Navbar, NavbarToggler, Nav } from 'reactstrap';
import {Link} from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {active: false};
  }

  componentWillReceiveProps(nextProps) {
    
    if(nextProps.auth) {
      this.setState({active: true});
     
    } else {
      this.setState({active: false});
    }
      
  }

  renderContent() {
    switch (this.state.active) {
      case null:
        return;
      case false:
        return (
          <Link to="/login" className="nav-link">LOGIN</Link>
        );
      default:
        return (
          <Link to="/logout" className="nav-link">LOGOUT</Link>
        );

    }
  }

  test = () => {
    if(this.props.auth) {
      this.setState({active: !this.state.active});
     
    } else {
      this.setState({active: !this.state.active});
    }
  }

  toggle = () => {
    this.setState({active: !this.state.active});
  }

  render() {
    return (
      <Navbar color="faded" light expand="md">

        <Link to="/" className="mr-auto navbar-brand">HOME</Link>
        
        <NavbarToggler onClick={this.props.toggleNavbar} className="mr-2" />

        <Collapse isOpen={!this.props.collapsed} navbar>
          <Nav navbar className="ml-auto">
              <li className="nav-item">
                <Link to="/list" className="nav-link">LIST</Link>
              </li>
              <li className="nav-item">
                {this.renderContent()}
              </li>
          </Nav>
        </Collapse>

      </Navbar>
    );
  }
}

export default NavBar;

