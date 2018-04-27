import React from 'react';
import { Link } from 'react-router-dom';
const UserItem = ({user, onUserSelect, match}) => {
	return (
	    <tr onClick={() => onUserSelect(user)}>
	      <td>{user.id}</td>
	      <td>{user.login}</td>
	      <td>
	      	<img className="image" src={user.avatar_url} alt={user.avatar_url} />
	      </td>
	    </tr>
    );
}

export default UserItem;