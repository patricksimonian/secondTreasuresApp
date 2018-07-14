import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dummyBooks from './dummy.json';
//components
import Books from '../components/Books/Books';

class BookClub extends Component {
  static displayName = "";
  state = {
    books: dummyBooks
  }

  componentDidMount() {
    console.log(this.state.books);
  }

  render() {
    return (
      <div>
        <Books books={this.state.books} />
      </div>
    )
  }
}

BookClub.propTypes = {};

export default BookClub;
