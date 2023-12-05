//const ENDPOINT_URL = "http://192.168.0.158:9041";
const API_URL = "http://192.168.1.83:5000";

//export const REGISTER_ENDPOINT = ENDPOINT_URL + "/api/withouttoken/externaluser/login";
export const REGISTER_ENDPOINT = `${API_URL}/users`;
export const LOGIN_ENDPOINT = `${API_URL}/users/login`;
export const CREATE_POLL_ENDPOINT = `${API_URL}/polls`;