import * as actionTypes from './actionTypes';
import axiosAuth from '../../axios-auth';
//sync actions
export const loginInit = () => {
  //attempt to get auth token from local storage if set
  //ideally if we find it, we will authenticate it on the backend
  //however for now, any action to the server will authenticate the token
  //prior to commiting and change, so this will work for now
  return {
    type: actionTypes.LOGIN_INIT,
    payload: {
      token: window.localStorage.getItem('authToken')
    }
  }
}
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
