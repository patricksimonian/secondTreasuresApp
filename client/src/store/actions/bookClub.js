import * as actionTypes from './actionTypes';
import axiosBooks from '../../axios-books';
//sync actions
export const setBooks = (books) => {
  return {
    type: actionTypes.SET_BOOKS,
    payload: {
      books,
    }
  }
}

export const setActiveBook = (isbn) => {
  return {
    type: actionTypes.SET_ACTIVE_BOOK,
    payload: {
      isbn
    }
  }
}

export const fetchBooksFailed = () => {
   return {
     type: actionTypes.FETCH_BOOKS_FAILED
   }
}
//async actions leveraging thunk lib
export const initBooks = () => {
  return dispatch => {
    axiosBooks.get('/')
    .then(response => {
      //books from data
      dispatch(setBooks(response.data.data))
    })
    .catch(() => {
      dispatch(fetchBooksFailed());
    });
  }
}
