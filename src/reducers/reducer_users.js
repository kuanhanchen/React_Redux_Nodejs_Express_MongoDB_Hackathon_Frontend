import { FETCH_USER } from '../actions';
import _ from 'lodash';

export default function(state = '', action) {

    switch (action.type) {
        case FETCH_USER:
			return _.mapKeys(action.payload.data.user, '_id');
		default:
			return state;
	}
}