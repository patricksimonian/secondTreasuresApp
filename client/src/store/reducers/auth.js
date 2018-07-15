import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  isAuthorized: false,
  token: null,
  error: false,
  messages: []
}

const setErrorWithMessages = (state, messages) => updateObject(state, {messages, error: true});

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN_FAILED: return setErrorWithMessages(state, action.payload.messages);
  }
  return state;
}

export default reducer;
