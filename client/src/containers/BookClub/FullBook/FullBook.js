import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axiosBooks from '../../../axios-books';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/index';

import BookSummary from '../../../components/BookSummary/BookSummary';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
class FullBook extends Component {
  static displayName = "[Component FullBook]";
  state = {
    editMode: true,
    deleting: false
  }

  componentDidMount() {
    const isbn = this.props.match.params.isbn;
    if(isbn) {
      if(!this.props.activeBook || this.props.activeBook.isbn !== isbn) {
        //attempt to get book details from server
        this.props.viewBook(isbn);
      }
    }
  }

  closeView = () => {
    this.props.history.replace('/');
  }

  onDeleteHandler = () => {
    this.setState({deleting: true});
  }

  render() {
    let book = <h2>No Book Found {":("}</h2>;
    if(this.props.activeBook) {
      book = <BookSummary
              img_url={this.props.activeBook.img_url}
              authors={this.props.activeBook.authors}
              title={this.props.activeBook.title}
              isbn_formatted={this.props.activeBook.isbn_formatted}
              isbn={this.props.activeBook.isbn}
              genre={this.props.activeBook.genre}
              cost={this.props.activeBook.price}
              stock={this.props.activeBook.stock}
              editing={this.state.editMode}
              deleteClicked={this.onDeleteHandler}/>
    }
    return (
        <Modal show modalClosed={this.closeView}>
            {book}
            <Button buttonType='Neutral' clicked={this.closeView}>Close</Button>
        </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    activeBook: state.bc.activeBook
  }
}

const mapDispatchToProps = dispatch => {
  return {
    viewBook: (isbn) => dispatch(actionCreators.setActiveBook(isbn))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullBook);
