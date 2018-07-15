import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const intialState = {
  books: null,
  error: false
}
//set books and reset error state to false
const setBooks = (state, books) => {
  return updateObject(state,  {books, error: false});
}

const setError = state => updateObject(state, {error: true});

const reducer = (state = intialState, action) => {
  switch(action.type) {
    case actionTypes.SET_BOOKS: return setBooks(state, action.payload.books);
    case actionTypes.FETCH_BOOKS_FAILED: return setError(state);
  }
  return state;
}

export default reducer;
