import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_ADMIN_MESSAGE,
  SET_ADMIN_PRIVILEGES,
  FETCH_PROFILE,
  UPDATE_PROFILE,
  FETCH_USERS,
  UPDATE_PROFILE_IMAGE
} from './types';

const jwt_decode = require('jwt-decode');

const ROOT_URL = '';

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });

        // decode token for info on the user
        let decoded_token_data = jwt_decode(response.data.token);

        // - Save the JWT token
        localStorage.setItem('token', response.data.token);

        // - redirect to the appropriate route
        if(decoded_token_data.role == 'user') {
          browserHistory.push('/protected_content');
        }
        // - set admin flag if token indicates the user has admin privileges
        else if(decoded_token_data.role == 'admin') {
          dispatch({ type: SET_ADMIN_PRIVILEGES });
          browserHistory.push('/admin_area');
        }
        else {
          browserHistory.push('/');
        }
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ email, password, fullName, city, bio, skill, showEmail }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password, fullName, city, bio, skill, showEmail })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/protected_content');
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}



//token included in the header of the request for authorization
export function activateAdmin({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/admin_activation`,
      { email, password },
      {headers: { authorization: localStorage.getItem('token') }} )
      .then(response => {
        browserHistory.push('/admin_area');
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

//token included in the header of the request for authorization
export function fetchMessage() {
  return function(dispatch) {
    console.log('api path', `${ROOT_URL}/protected_content`);
    axios.get(`${ROOT_URL}/protected_content`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        console.log('this is the response', response);
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.email
        });
      });
  }
}



//token included in the header of the request for authorization
export function fetchAdminMessage() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/admin_area`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_ADMIN_MESSAGE,
          payload: response.data.message
        });
      });
  }
}

export function getProfile() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/profile`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_PROFILE,
          payload: response.data
        });
      })
  }
}

export function updateProfile(data) {
  return function(dispatch) {
    axios.put(`${ROOT_URL}/profile`, data, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: UPDATE_PROFILE,
          payload: response.data
        });
      });
  }
}

export function findUsers(query) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/users?city=${query.city || ''}&&skill=${query.skill || ''}`, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then(response => {
        dispatch({
          type: FETCH_USERS,
          payload: response.data
        });
      });
  }
}

export function updateProfileImage(imageUrl) {
  return function(dispatch) {
    axios.put(`${ROOT_URL}/profile/image`, { imageUrl }, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: UPDATE_PROFILE_IMAGE,
          payload: response.data
        });
      });
  }
}
