import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, CardTitle, CardHeader, Button } from 'reactstrap';

class UserDetail extends Component {

	constructor(props) {
	    super(props);
	    // remember that you have to initialize
	    // the same data type for the result you want to get in state
	    this.state = {selectedUserDetail: null};
	    
	  }

    componentDidMount() {
    	
	    axios({method: 'get', url: `https://api.github.com/users/${this.props.match.params.userId}`})
	    .then(response => {
	    	
	      this.setState({selectedUserDetail: response.data});
	    })
	    .catch(err => {
	      console.log(err);
	      alert(err);
	    });
  	}
	
	render() {
		
		if (!this.state.selectedUserDetail) {
  			return (
  				<div>
  					Loading...
  				</div>
  			);
  		} else {
			return (
			    <Card className="text-center">
			        <CardHeader tag="h3">{this.state.selectedUserDetail.login}</CardHeader>
			        <CardBody>
			          <CardTitle>Location: {this.state.selectedUserDetail.location}</CardTitle>
			          <CardText>Following: {this.state.selectedUserDetail.following}</CardText>
			          <CardText>Followers: {this.state.selectedUserDetail.followers}</CardText>
			          <Link to="/list"><Button>Back to List</Button></Link>
			        </CardBody>
			     </Card>
			);
		}
	}
}

export default UserDetail;