import * as actionTypes from './actionTypes';
import axiosBooks from '../../axios-books';
//sync actions
export const setActiveBook = (isbn) => {
  return {
    type: actionTypes.SET_ACTIVE_BOOK,
    payload: {
      isbn
    }
  }
}
export const fetchBooksStart = () => {
  return {
    type: actionTypes.FETCH_BOOKS_START
  }
}
export const fetchBooksSuccess = (books) => {
  return {
    type: actionTypes.FETCH_BOOKS_SUCCESS,
    payload: {
      books,
    }
  }
}

export const fetchBooksFailed = () => {
   return {
     type: actionTypes.FETCH_BOOKS_FAILED
   }
}

export const deleteBookStart = () => {
  return {
    type: actionTypes.DELETE_BOOK_START
  }
}
export const deleteBookSuccess = () => {
  return {
    type: actionTypes.DELETE_BOOK_SUCCESS
  }
}
export const deleteBookFailed = () => {
  return {
    type: actionTypes.DELETE_BOOK_FAILED
  }
}
//async actions leveraging thunk lib
export const initBooks = () => {
  return dispatch => {
    dispatch(fetchBooksStart());
    axiosBooks.get('/')
    .then(response => {
      //books from data
      dispatch(fetchBooksSuccess(response.data.data))
    })
    .catch(() => {
      dispatch(fetchBooksFailed());
    });
  }
}

export const deleteBook = (isbn) => {
  return dispatch => {
    dispatch(deleteBookStart());
    console.log(isbn, 'from action')
    axiosBooks.delete('/' + isbn)
    .then(response => {
      dispatch(deleteBookSuccess());
    })
    .catch((err) => {
      dispatch(deleteBookFailed(err)); //generally would fail if unauthenticated
    });
  }
}
