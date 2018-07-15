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

export const loginFailed = () => {
  return {
    type: actionTypes.LOGIN_FAILED
  }
}
//async
export const login = () => {
  return dispatch => {
    dispatch(loginStart());
  }
}
