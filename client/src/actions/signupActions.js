import axios from 'axios';
import config from './../config';



export function userSignupRequest(userData) {
  return dispatch => {
    return axios.post(config.URL + 'api/v1/users', userData);
  }
}
export function isEmailAvailable(email) {
  return dispatch => {
    return axios.post(config.URL + `api/v1/users/emailavailable`, email);
  }
}