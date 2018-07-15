import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  isAuthorized: false,
  token: null,
  error: false,
  messages: []
}

const setErrorWithMessages = (state, messages) => updateObject(state, {messages, error: true});
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

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN_FAILED: return setErrorWithMessages(state, action.payload.messages);
    case actionTypes.LOGIN_SUCCESS: return setToken(state, action.payload.token);
  }
  return state;
}

export default reducer;
