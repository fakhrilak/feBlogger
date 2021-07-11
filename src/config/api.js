import axios from 'axios';
// Set config defaults when creating the instance
export const API = axios.create({
	// baseURL: ' http://192.168.10.120:5000/ta/'
	baseURL: 'http://70d1b2b6cb42.ngrok.io/ta/'
});

// Alter defaults after instance has been created
export const setAuthToken = (token) => {
	if (token) {
		API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete API.defaults.headers.common['Authorization'];
	}
};

export const APIimage = "http://70d1b2b6cb42.ngrok.io/ta/thumbnil/"

export const config = {
	headers: {
		'Content-Type': 'application/json'
	}
};