import * as actionTypes from './actionTypes';
import axiosAuth from '../../axios-auth';
//sync actions
export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  }
}

export const loginSuccess = (token) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      token
    }
  }
}

export const loginFailed = (messages) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    payload: {
      messages
    }
  }
}
//async
export const login = (username, password) => {
  return dispatch => {
    dispatch(loginStart());
    axiosAuth.post('/api/login', {username, password})
    .then(response => {
      //dispatch token to reducer
      dispatch(loginSuccess(response.data.token));
    })
    .catch(err => {
      dispatch(loginFailed(err.response.data.message));
    });
  }
}
