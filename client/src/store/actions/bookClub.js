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
export const deleteBookSuccess = (isbn) => {
  return {
    type: actionTypes.DELETE_BOOK_SUCCESS,
    payload: {
      isbn
    }
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

export const deleteBook = (isbn, token) => {
  return dispatch => {
    dispatch(deleteBookStart());
    axiosBooks.delete('/' + isbn, {
      headers: {'AUTHORIZATION': token}
    })
    .then(response => {
      dispatch(deleteBookSuccess(response.data.isbn));
    })
    .catch((err) => {
      console.log(err);
      dispatch(deleteBookFailed(err)); //generally would fail if unauthenticated
    });
  }
}
