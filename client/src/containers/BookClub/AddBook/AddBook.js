import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import ImageUploader from 'react-images-upload';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
class AddBook extends Component {
  static displayName = "[Component AddBook]";

  state = {
    bookData: {
      img_url: '',
      title: '',
      isbn: '',
      author: '',
      genre: '',
      price: 0,
      stock: 0
    }

  }

  componentDidMount() {

  }
  componentDidUpdate() {
    if(this.props.bookAdded) {
      //simulate delay to fetch more books
      setTimeout(() => {
        this.props.initBooks();
        this.props.history.push('/');
      }, 1000)
    }
  }
  imgChangedHandler = (event) => {
    const newState = {...this.state, bookData: {...this.state.bookData}};
    newState.bookData.img_url = event.target.value;
    this.setState(newState);
  }
  titleChangedHandler = (event) => {
    const newState = {...this.state, bookData: {...this.state.bookData}};
    newState.bookData.title = event.target.value;
    this.setState(newState);
  }
  isbnChangedHandler = (event) => {
    const newState = {...this.state, bookData: {...this.state.bookData}};
    newState.bookData.isbn = event.target.value;
    this.setState(newState);
  }
  genreChangedHandler = (event) => {
    const newState = {...this.state, bookData: {...this.state.bookData}};
    newState.bookData.genre = event.target.value;
    this.setState(newState);
  }
  priceChangedHandler = (event) => {
    const newState = {...this.state, bookData: {...this.state.bookData}};
    newState.bookData.price = event.target.value;
    this.setState(newState);
  }
  stockChangedHandler = (event) => {
    const newState = {...this.state, bookData: {...this.state.bookData}};
    newState.bookData.stock = event.target.value;
    this.setState(newState);
  }
  authorChangedHandler = (event) => {
    const newState = {...this.state, bookData: {...this.state.bookData}};
    newState.bookData.author = event.target.value;
    this.setState(newState);
  }

  onAddBookHandler = (event) => {
    event.preventDefault();
    this.props.addBook(this.state.bookData, this.props.token);
  }

  render() {
    let successIndicator = null;
    if(this.props.bookAdded) {
      successIndicator = <div>Book Added!</div>
    }
    return (
      <div>
        {successIndicator}
        <form onSubmit={this.onAddBookHandler}>
          <Input onChange={this.imgChangedHandler} inputtype="input" type='text' placeholder='https://mypicture.com/picture.jpg' value={this.state.bookData.img_url}/>
          <Input onChange={this.titleChangedHandler} inputtype="input" type='text' placeholder='Title' value={this.state.bookData.title}/>
          <Input onChange={this.isbnChangedHandler} inputtype="input" type='text' placeholder='ISBN'value={this.state.bookData.isbn}/>
          <select onChange={this.genreChangedHandler} value={this.state.bookData.genre}>
            <option value="Fantasy">Fantasy</option>
            <option value="Non-Fantasy">Non-Fiction</option>
            <option value="Suspense">Suspense</option>
            <option value="Thriller">Thriller</option>
            <option value="Travel">Travel</option>
          </select>
          <Input onChange={this.authorChangedHandler} inputtype="input" type='text' placeholder='author' value={this.state.bookData.author}/>
          <Input onChange={this.stockChangedHandler} inputtype="input" type='number' step="1" min="0" placeholder='stock' value={this.state.bookData.stock}/>
          <Input onChange={this.priceChangedHandler} inputtype="input" type='number' step=".01" min="0" placeholder='price' value={this.state.bookData.price}/>
          <Button buttonType="Success">Add Book!</Button>
        </form>
        <div>
          {this.state.bookData.img_url.trim() !== '' ? <img src={this.state.bookData.img_url} alt="preview failed" /> : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    bookAdded: state.bc.bookAdded
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addBook: (book, token) => {dispatch(actionCreators.addBook(book, token))},
    initBooks: () => {dispatch(actionCreators.initBooks())}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
