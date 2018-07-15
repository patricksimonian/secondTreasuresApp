import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const intialState = {
  books: null,
  error: false,
  activeBook: null
}
//set books and reset error state to false
const setBooks = (state, books) => {
  return updateObject(state,  {books, error: false});
}

const setActiveBook = (state, isbn) => {
    //first find book by isbn
    if(state.books) {
      const bookInd = state.books.findIndex(b => b.isbn === isbn);
      if(bookInd >= 0) {
        const activeBook = {...state.books[bookInd], authors: {...state.books[bookInd].authors}}
        return updateObject(state, {activeBook});
      }
    }
    return updateObject(state, {activeBook: null});
}

const setError = state => updateObject(state, {error: true});

const reducer = (state = intialState, action) => {
  switch(action.type) {
    case actionTypes.SET_BOOKS: return setBooks(state, action.payload.books);
    case actionTypes.FETCH_BOOKS_FAILED: return setError(state);
    case actionTypes.SET_ACTIVE_BOOK: return setActiveBook(state, action.payload.isbn);
  }
  return state;
}

export default reducer;
