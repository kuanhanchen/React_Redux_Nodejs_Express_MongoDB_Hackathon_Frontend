import React, {Component} from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchUser, fetchServices} from '../actions';
import _ from 'lodash';

class Service extends Component {

  componentWillMount() {
    if(_.size(this.props.user)) {
        // console.log(this.props.user[0].userId);
        this.props.fetchService(_.keys(this.props.user)[0]);
    }
  }

  render() {
    if(_.size(this.props.user)) {
        console.log(_.keys(this.props.user)[0]);
        return (
            <Table hover>
            <thead>
                <tr>
                <th>Server Name</th>
                <th>Status</th>
                <th>Version</th>
                <th>Started Time</th>
                <th>Lasted</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
            </Table>   
        );
    }
    return (
        <div>
            No
        </div>
    )
  }
};

function mapStateToProps(state) {
    return { 
      user: state.users,
      services: state.services
     };
  }
  
  export default connect(mapStateToProps, {fetchUser, fetchServices})(Service);