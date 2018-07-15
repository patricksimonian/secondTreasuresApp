import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  isAuthorized: false,
  token: null,
  error: false,
  messages: []
}

const setErrorWithMessages = (state, messages) => {
  //remove token from local storage
  window.localStorage.removeItem('authToken');
  return updateObject(state, {
    messages,
    error: true,
    isAuthorized: false,
    token: null}
  )
}
//sets jwt token into store
const setToken = (state, token) => {
  //set token into local storage as well as in store
  //we will retrieve token from local storage and check if valid later on
  window.localStorage.setItem('authToken', token);
  return {
    ...initialState,
    isAuthorized: true,
    error: false,
    messages: [],
    token
  }
}

const setIfLoggedIn = (state, token) => {
  if(token) {
    return setToken(state, token);
  }
  return state;
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN_FAILED: return setErrorWithMessages(state, action.payload.messages);
    case actionTypes.LOGIN_SUCCESS: return setToken(state, action.payload.token);
    case actionTypes.LOGIN_INIT: return setIfLoggedIn(state, action.payload.token);
  }
  return state;
}

export default reducer;
