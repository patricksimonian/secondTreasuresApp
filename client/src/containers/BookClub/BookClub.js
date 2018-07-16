import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import axiosBooks from '../../axios-books';
import * as actionCreators from '../../store/actions/index';
//components
import MainHeader from '../../components/MainHeader/MainHeader';
import Books from '../../components/Books/Books';
import FullBook from './FullBook/FullBook';
import Spinner from '../../components/UI/Spinner/Spinner';
import BookSearch from '../../components/BookSearch/BookSearch';
//hocs
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
//main container
class BookClub extends Component {
  static displayName = "[Component BookClub]";

  componentDidMount() {
    this.props.onInitBooks(); //load books initially
  }

  componentDidUpdate() {
    //if props.books is 0 we haven't been able to fetch any books..
    //this could be intentional but also it could be by mistake that the database
    //returned 0 rows.
    //dispatch a call to server to notify admin (by email*** one day) that this has occured!
    if (this.props.books !== null && this.props.books.length === 0) {
      //dispatch axios call to to notify admin
    }
  }
  //book is clicked to view more details
  bookClickedHandler = (isbn) => {
      //push book route to history
      this.props.history.push('/books/' + isbn);
  }

  render() {
    let books = null;
    if(this.props.books === null || this.props.loading) {
      //set books to be a spinner
      books = (
        <div style={{overflow: 'hidden'}}>
          <Spinner>Loading</Spinner>
        </div>
      );
    } else if(this.props.books.length === 0) {
      //take note of componentDidUpdate on how we should potentially handle this
      books = <h2>No Books Available Right now..we are working on it!</h2>
    } else if(this.props.filteredBooks.length === 0) {
      books = <h2>No Books found!</h2>
    } else {
      books = <Books books={this.props.filteredBooks} viewBook={this.bookClickedHandler}/>;
    }
    return (
      <div>
        <MainHeader />
        <BookSearch onFilter={this.props.onFilterBooks}/>
        {books}
        {this.props.books !== null ? <Route path="/books/:isbn" component={FullBook} />: null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    books: state.bc.books,
    filteredBooks: state.bc.filteredBooks,
    error: state.bc.error,
    loading: state.bc.loading,
    activeBook: state.bc.activeBook,
    booksNeedUpdating: state.bc.booksNeedUpdating
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitBooks: () => dispatch(actionCreators.initBooks()),
    onFilterBooks: (keywords, genre) => dispatch(actionCreators.filterBooks(keywords, genre)),
    onReset: () => dispatch(actionCreators.filterBooksReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BookClub, axiosBooks));
