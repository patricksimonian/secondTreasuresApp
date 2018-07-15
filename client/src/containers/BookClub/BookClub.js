import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import axiosBooks from '../../axios-books';
import * as actionCreators from '../../store/actions/index';
//components
import Books from '../../components/Books/Books';
import FullBook from './FullBook/FullBook';
import Spinner from '../../components/UI/Spinner/Spinner';
//hocs
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BookClub extends Component {
  static displayName = "[Component: BookClub]";

  componentDidMount() {
    this.props.onInitBooks();
  }
  //book is clicked to view more details
  bookClickedHandler = (isbn) => {
      //push book route to history
      this.props.history.push('/books/' + isbn);
  }

  render() {
    let books = null;
    if(!this.props.books) {
      books = <Spinner>Loading</Spinner>;
    } else {
      books = <Books books={this.props.books} viewBook={this.bookClickedHandler}/>;
    }
    return (
      <div>
        {books}
        <Route path='/books/:isbn' component={FullBook} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    books: state.bc.books,
    error: state.bc.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitBooks: () => dispatch(actionCreators.initBooks())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BookClub, axiosBooks));
