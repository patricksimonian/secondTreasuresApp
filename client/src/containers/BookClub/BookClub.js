import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import axiosBooks from '../../axios-books';

import PropTypes from 'prop-types';
import dummyBooks from '../dummy.json';
//components
import Books from '../../components/Books/Books';
import FullBook from './FullBook/FullBook';
import Spinner from '../../components/UI/Spinner/Spinner';
class BookClub extends Component {
  static displayName = "";
  state = {
    books: [],
    loadingBooks: true
  }

  componentDidMount() {
    axiosBooks.get('/')
    .then(response => {
      //books from data
      this.setState({books: response.data.data, loadingBooks: false});
    });
  }
  //book is clicked to view more details
  bookClickedHandler = (isbn) => {
      //push book route to history
      this.props.history.push('/books/' + isbn);
  }

  render() {
    let books = null;
    if(this.state.loadingBooks) {
      books = <Spinner>Loading</Spinner>;
    } else {
      books = <Books books={this.state.books} viewBook={this.bookClickedHandler}/>;
    }
    return (
      <div>
        {books}
        <Route path='/books/:isbn' component={FullBook} />
      </div>
    )
  }
}

BookClub.propTypes = {};

export default BookClub;
