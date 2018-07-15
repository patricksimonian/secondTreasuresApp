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
//hocs
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BookClub extends Component {
  static displayName = "[Component: BookClub]";

  componentDidMount() {
    this.props.onInitBooks();
  }

  componentDidUpdate() {
    //if props.books is 0 we haven't been able to fetch any books..
    //this could be intentional but also it could be by mistake that the database
    //returned 0 rows.
    //dispatch a call to server to notify admin (by email*** one day) that this has occured!
    if(this.props.books !== null && this.props.books.length === 0) {
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
    if(this.props.books === null) {
      books = (
        <div style={{overflow: 'hidden'}}>
          <Spinner>Loading</Spinner>
        </div>);
    } else if(this.props.books.length === 0) {
      books = <h2>No Books Available Right now..we are working on it!</h2>
    } else {
      books = <Books books={this.props.books} viewBook={this.bookClickedHandler}/>;
    }
    return (
      <div>
        <MainHeader />
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
