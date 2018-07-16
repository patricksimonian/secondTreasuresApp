import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const intialState = {
  books: null,
  filteredBooks: null, //the filtered list of books via the genre dropdown and searchbar
  error: false,
  activeBook: null,
  loading: false,
  bookDeleted: false,
  bookAdded: false,
  booksNeedUpdating: false
}
const setLoading = state => updateObject(state, {loading: true});
//set books and reset error state to false
const setBooks = (state, books) => {
  return updateObject(state,  {books, filteredBooks: books, error: false, loading: false, booksNeedUpdating: false, bookAdded: false});
}

const setActiveBook = (state, isbn) => {
    //first find book by isbn
    if(state.books) {
      const bookInd = state.books.findIndex(b => b.isbn === isbn);
      if(bookInd >= 0) {
        const authors = [...state.books[bookInd].authors];
        const activeBook = {...state.books[bookInd], authors}
        return updateObject(state, {activeBook, error: false, bookDeleted: false});
      }
    }
    return updateObject(state, {activeBook: null, bookDeleted: false});
}

const setError = state => updateObject(state, {error: true, loading: false});

const setBookDeleted = (state, isbn) => {
  //remove book from books array by isbn
  let books = state.books.filter(b => b.isbn !== isbn);
  return updateObject(state, {books, activeBook: null, bookDeleted: true, loading: false});
}

const setBookAdded = state => ({...state, bookAdded: true})

const filterBooks = (state, keywords, genre) => {
  //clone books
  let copiedBooks = {...state.books};
  copiedBooks = filterBooks.map(b => ({...b}));
  let keywordRe = new RegExp(keywords, 'i'); //create a regex object on keywords
  const filteredBooks = copiedBooks.filter(b => {
    if(genre === 'any') {
      return b.title.search(keywordRe) > -1;
    } else {
      return b.genre.toLowerCase() === genre && b.title.search(keywordRe) > -1;
    }
  });
  return updateObject(state, {filteredBooks});
}

const resetFilteredBooks = state => {
  let copiedBooks = {...state.books};
  copiedBooks = filterBooks.map(b => ({...b}));
  return updateObject(state, {filteredBooks: copiedBooks});
}

const reducer = (state = intialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_BOOKS_SUCCESS: return setBooks(state, action.payload.books);
    case actionTypes.FETCH_BOOKS_START: return setLoading(state);
    case actionTypes.FETCH_BOOKS_FAILED: return setError(state);
    case actionTypes.SET_ACTIVE_BOOK: return setActiveBook(state, action.payload.isbn);
    case actionTypes.DELETE_BOOK_START: return setLoading(state);
    case actionTypes.DELETE_BOOK_SUCCESS: return setBookDeleted(state, action.payload.isbn);
    case actionTypes.DELETE_BOOK_FAILED: return setError(state);
    case actionTypes.ADD_BOOK_START: return setLoading(state);
    case actionTypes.ADD_BOOK_SUCCESS: return setBookAdded(state);
    case actionTypes.ADD_BOOK_FAILED: return setError(state);
  }
  return state;
}

export default reducer;
