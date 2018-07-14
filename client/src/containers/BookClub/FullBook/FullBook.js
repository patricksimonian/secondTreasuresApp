import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axiosBooks from '../../../axios-books';

import BookSummary from '../../../components/BookSummary/BookSummary';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
class FullBook extends Component {
  static displayName = "[Component FullBook]";
  state = {
    loadedBook: null,
    viewingBook: true
  }

  componentDidMount() {
    const isbn = this.props.match.params.isbn;
    if(isbn) {
      if(!this.state.loadedBook || this.state.loadedBook.isbn !== isbn) {
        //attempt to get book details from server
        axiosBooks.get('/' + this.props.match.params.isbn)
        .then(response => {
          const book = response.data.data;
          this.setState({loadedBook: book});
        });
      }
    }
  }
  closeView = () => {
    this.props.history.replace('/');
  }
  render() {
    let book = <h2>No Book Found {":("}</h2>;
    if(!this.state.loadedBook) {
      book = <Spinner />
    } else {
      book = <BookSummary img_url={this.state.loadedBook.img_url} />
    }
    return (
        <Modal show={this.state.viewingBook} modalClosed={this.closeView}>
            {book}
        </Modal>
    )
  }
}

FullBook.propTypes = {};

export default FullBook;
