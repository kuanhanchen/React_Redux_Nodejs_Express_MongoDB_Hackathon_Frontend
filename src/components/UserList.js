import React, {Component} from 'react';
import UserListItem from './UserListItem';
import { Redirect } from 'react-router-dom';
import { Table } from 'reactstrap';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {redirect: false, selectedUser: null};
  }

  onUserSelect = (selectedUser) => {
    this.setState({selectedUser: selectedUser, redirect: true});
  };

  render() {
    if (this.props.auth) {
      
      return (
        <div>
        <Table hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>username</th>
              <th>image</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map((user, index) => {
              return (
                <UserListItem 
                  onUserSelect={this.onUserSelect}
                  key={user.id} 
                  user={user}
                  match={this.props.match} 
                />
              );
            })}
          </tbody>
        </Table>  

        {this.state.redirect && (<Redirect to={`${this.props.match.url}/${this.state.selectedUser.login}`}/>)}
      </div>
      );
    } else {
      return <Redirect to={{pathname: '/login'}} />;
    }
  }
}

export default UserList;