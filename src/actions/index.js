import axios from 'axios';

export const FETCH_USERS = 'fetch_users';

export const DELETE_USER = 'delete_user';
export const EDIT_USER = 'edit_user';
export const SORT_USERS = 'sort_users';

export const FETCH_REPORTS = 'fetch_reports';

export const CREATE_INDEX_FILTER = 'create_index_filter';
export const CREATE_REPORT_FILTER = 'create_report_filter';

export const IMG_DIR = 'http://localhost:3001/uploads/';



export const CREATE_MESSAGE = 'create_message';
export const CREATE_USER = 'create_user';
export const FETCH_USER = 'fetch_user';
export const FETCH_SERVICES = 'fetch_services';

const ROOT_URL = '/api';

export function createMessage(values, callback) {
    console.log(values);
    const request = axios.post(`${ROOT_URL}/message`, values)
        .then(callback());
        
    return {
        type: CREATE_MESSAGE,
        payload: request
    }
}

export function createUser(values, callback) {
	
	const request = axios.post(`${ROOT_URL}/users`, values)
        .then(callback());

	return {
		type: CREATE_USER,
		payload: request
	};
}

export function fetchUser(values, callback) {

    const request = axios.get(`${ROOT_URL}/users/${values.email}/${values.password}`)
        .then(callback());
    
    return {
        type: FETCH_USER,
        payload: request
    };
}

export function fetchServices(id) {

    const request = axios.get(`${ROOT_URL}/service/${id}`)
    
    return {
        type: FETCH_SERVICES,
        payload: request
    };
}

// export function fetchUser(id) {

// 	const request = axios.get(`${ROOT_URL}/users/${id}`);

// 	return {
// 		type: FETCH_USER,
// 		payload: request
// 	};
// }

export function deleteUser(id, callback) {
	console.log(id);
	axios.delete(`${ROOT_URL}/users/${id}`)
		// .then(axios.put(`${ROOT_URL}/users/reports/${id}`, fileData))
		.then(callback());

	return {
		type: DELETE_USER,
		payload: id
	};
}

export function editUser(id, values, callback) {

	// http://localhost:3001/uploads/1522052499960-1516566030924273.jpg

	// if uploading a new image in edit form, update it in userModel and upload it in "uploads" folder 
	if (values.image) {
		const fileData = new FormData();
		const fileName = Date.now() + '-' + values.image.name;
		fileData.append('image', values.image, fileName);
		console.log(fileData);
		values = {...values, image: fileName}
		console.log(values);

		const request = axios.put(`${ROOT_URL}/users/${id}`, values)
			.then(axios.post(`${ROOT_URL}/users/avatar`, fileData))
			.then(callback());
		return {
			type: EDIT_USER,
			payload: request
		};
	} else {	// if without updating a new image, then just update new data in userModel
		const request = axios.put(`${ROOT_URL}/users/${id}`, values)
			.then(callback());
		return {
			type: EDIT_USER,
			payload: request
		};
	}
}
