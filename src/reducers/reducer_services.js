import { FETCH_SERVICES } from '../actions';
import _ from 'lodash';

export default function(state = '', action) {
    switch (action.type) {
        case FETCH_SERVICES:
			return _.mapKeys(action.payload.data.services, '_id');
		default:
			return state;
	}
}