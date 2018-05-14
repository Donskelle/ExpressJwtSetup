import axios from 'axios';
import { setAuthorizationToken } from '../utils/request';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';
import config from './../config';
import { clearStorage, getStorage, setStorage } from './../utils/request.js'


export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function logout() {
  return dispatch => {
    clearStorage();
    //setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {
  return dispatch => {
    return axios.post(config.URL + '/api/v1/users/signin', data).then(res => {
      const { token, user } = res.data;
      setStorage({ user, jwt: token });

      //setAuthorizationToken(token);
      dispatch(setCurrentUser(user));
    });
  }
}

export function initUser() {
  return dispatch => {
    let { jwt, user } = getStorage();
    if (jwt) {
      const { exp } = jwtDecode(jwt);
      if (exp < new Date().getTime()) {
        clearStorage();
      }
      else {
        dispatch(setCurrentUser(user));
      }
    }
  }
}

export function loginFacebook(data) {
  return dispatch => {
    return axios.post(config.URL + 'api/v1/users/oauth/facebook', data).then(res => {
      const { token, user } = res.data;
      setStorage({ user, jwt: token });

      dispatch(setCurrentUser(user));
    });
  }
}


export function resetPasswort(data) {
  return dispatch => {

    return axios.post(`${config.URL}api/v1/users/forgot/reset`, data)
      .then((response) => {
        const { token, user } = response.data;
        setStorage({ user, jwt: token });
        dispatch(setCurrentUser(user));
      })
  }
}


export function forgotPasswort(data) {
    axios.post(`${config.URL}api/v1/users/forgot/`, data)
}
