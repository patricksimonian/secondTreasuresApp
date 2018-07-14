import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import PropTypes from 'prop-types';
import dummyBooks from '../dummy.json';
//components
import Books from '../../components/Books/Books';
import FullBook from './FullBook/FullBook';

class BookClub extends Component {
  static displayName = "";
  state = {
    books: dummyBooks
  }

  componentDidMount() {
    console.log(this.state.books);
  }
  //book is clicked to view more details
  bookClickedHandler = (isbn) => {
      //push book route to history
      this.props.history.push('/books/' + isbn);
  }

  render() {
    return (
      <div>
        <Books books={this.state.books} viewBook={this.bookClickedHandler}/>
        <Route path='/books/:isbn' component={FullBook} />
      </div>
    )
  }
}

BookClub.propTypes = {};

export default BookClub;
