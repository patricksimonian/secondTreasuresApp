import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const intialState = {
  books: null,
  error: false,
  activeBook: null,
  loading: false
}
const setLoading = state => updateObject(state, {loading: true});
//set books and reset error state to false
const setBooks = (state, books) => {
  return updateObject(state,  {books, error: false, loading: false});
}

const setActiveBook = (state, isbn) => {
    //first find book by isbn
    if(state.books) {
      const bookInd = state.books.findIndex(b => b.isbn === isbn);
      if(bookInd >= 0) {
        const authors = [...state.books[bookInd].authors];
        const activeBook = {...state.books[bookInd], authors}
        return updateObject(state, {activeBook});
      }
    }
    return updateObject(state, {activeBook: null});
}

const setError = state => updateObject(state, {error: true, loading: false});

const reducer = (state = intialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_BOOKS_SUCCESS: return setBooks(state, action.payload.books);
    case actionTypes.FETCH_BOOKS_START: return setLoading(state);
    case actionTypes.FETCH_BOOKS_FAILED: return setError(state);
    case actionTypes.SET_ACTIVE_BOOK: return setActiveBook(state, action.payload.isbn);
  }
  return state;
}

export default reducer;
