import { combineReducers } from 'redux';
import UsersReducer from './reducer_users';
import MessageReducer from './reducer_message';
import ServicesReducer from './reducer_services';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	users: UsersReducer,
    form: formReducer,
    message: MessageReducer,
    services: ServicesReducer
});

export default rootReducer;
