import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import Aux from '../../../hoc/auxillary/auxillary';
import BookSummary from '../../../components/BookSummary/BookSummary';
import Modal from '../../../components/UI/Modal/Modal';
import Button from '../../../components/UI/Button/Button';
import ConfirmDelete from '../../../components/BookSummary/BookControls/ConfirmDelete/ConfirmDelete';

class FullBook extends Component {
  static displayName = "[Component FullBook]";
  state = {
    editMode: true
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

  componentDidUpdate() {
    if(this.props.error || this.props.refresh) {
      this.props.history.push('/');
    }
  }

  closeView = () => {
    //close full book modal and go back
    this.props.history.goBack();
  }

  //route loads the confirmation window
  onConfirmDeleteHandler = () => {
    this.props.history.push(this.props.match.url + '/delete');
  }
  //dispatches delete action
  confirmDelete = () => {
    this.props.deleteBook(this.props.activeBook.isbn, this.props.token);
  }
  
  render() {
    let bookSummary = <h2>No Book Found {":("}</h2>;
    //check if user is authorized, to conditionally render delete/edit buttons
    let deleteBookRedirect = this.props.isAuthorized ? null : <Redirect to={this.props.match.url} />
    if(this.props.activeBook) {
      bookSummary = <BookSummary
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
          <Route path={this.props.match.url + "/delete"} render={() => {
              return (
                <Aux>
                  {deleteBookRedirect}
                  <ConfirmDelete
                    closeView={this.closeView}
                    confirmDelete={this.confirmDelete}
                    goBack={() => {this.props.history.goBack()}}/>
                </Aux>
              )
            }} />

        <Route path={this.props.match.url} render={() => (
            <Modal show modalClosed={this.closeView}>
              {bookSummary}
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
