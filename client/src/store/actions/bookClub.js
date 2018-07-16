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

export const addBookStart = () => {
  return {
    type: actionTypes.ADD_BOOK_START
  }
}

export const addBookSuccess = () => {
  return {
    type: actionTypes.ADD_BOOK_SUCCESS
  }
}

export const addBookFailed = (messages) => {
  return {
    type: actionTypes.ADD_BOOK_FAILED,
    payload: {
      messages
    }
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
      dispatch(deleteBookFailed(err)); //generally would fail if unauthenticated
    });
  }
}

export const addBook = (book, token) => {
  return dispatch => {
    dispatch(addBookStart());
    axiosBooks.post('/', {book}, {
      headers: {'AUTHORIZATION': token}
    })
    .then(response => {
      //for some reason axios now throwing 400 type errors
      if(response instanceof Error) throw response;
      dispatch(addBookSuccess());
    })
    .catch(err => {
      dispatch(addBookFailed(err.response.data.message));
    });
  }
}
