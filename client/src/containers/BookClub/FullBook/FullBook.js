import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import axiosBooks from '../../../axios-books';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import Aux from '../../../hoc/auxillary/auxillary';
import BookSummary from '../../../components/BookSummary/BookSummary';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
class FullBook extends Component {
  static displayName = "[Component FullBook]";
  state = {
    editMode: true
  }
  constructor(props) {
    super(props);
    console.log("in here");
  }
  componentDidMount() {
    console.log("mounting");
    const isbn = this.props.match.params.isbn;
    if(isbn) {
      if(!this.props.activeBook || this.props.activeBook.isbn !== isbn) {
        //attempt to get book details from server
        this.props.viewBook(isbn);
      }
    }
  }
  componentDidUpdate() {
    if(this.props.error || this.props.refresh) {
      this.props.history.push('/');
    }
  }
  closeView = () => {
    this.props.history.replace('/');
  }

  onConfirmDeleteHandler = () => {
    this.props.history.push(this.props.match.url + '/delete');
  }

  render() {
    let book = <h2>No Book Found {":("}</h2>;
    //check if user is authorized, to conditionally render delete/edit buttons
    let deleteBookRedirect = this.props.isAuthorized ? null : <Redirect to={this.props.match.url} />
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
              deleteClicked={this.onConfirmDeleteHandler}
              isAuthorized={this.props.isAuthorized}/>
    }
    return (
      <Aux>
        <Switch>
          <Route path={this.props.match.url + "/delete"} render={() => (
            <Modal show modalClosed={this.closeView}>
              {deleteBookRedirect}
              <h2>Are you sure you'd like to delete this book?</h2>
              <Button
                buttonType="Danger"
                clicked={() => {this.props.deleteBook(this.props.activeBook.isbn, this.props.token)}}>Delete</Button>
              <Button
                buttonType="Neutral"
                clicked={() => {this.props.history.goBack()}}>Go Back</Button>
            </Modal>
        )} />
        <Route path={this.props.match.url} render={() => (
            <Modal show modalClosed={this.closeView}>
              {book}
              <Button buttonType="Neutral" clicked={this.closeView}>Close</Button>
            </Modal>
          )} />
        </Switch>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    activeBook: state.bc.activeBook,
    error: state.bc.error,
    token: state.auth.token,
    refresh: state.bc.bookDeleted,
    isAuthorized: state.auth.isAuthorized
  }
}

const mapDispatchToProps = dispatch => {
  return {
    viewBook: (isbn) => dispatch(actionCreators.setActiveBook(isbn)),
    deleteBook: (isbn, token) => dispatch(actionCreators.deleteBook(isbn, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullBook);
