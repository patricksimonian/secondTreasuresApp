import React, { Component } from 'react';
import validator from 'validator';
import axiosBooks from '../../../axios-books';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import genres from '../../../assets/genres.json'; //used for select list generation
import classes from './AddBook.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
//hocs
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
class AddBook extends Component {
  static displayName = "[Component AddBook]";
  //form config for easy form generation
  state = {
    bookData: {
      img_url: {
        showMessage: true,
        validationMessage: 'Image URL doesn\'t look right',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'https://www.yourbook.com/img.png'
        },
        label: 'Image URL',
        value: '',
        validation: {
          required: true,
          isURL: true
        },
        valid: false,
        touched: false
      },
      title: {
        showMessage: true,
        validationMessage: 'Title must be included',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Title'
        },
        label: 'Title',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      isbn: {
        showMessage: true,
        validationMessage: 'ISBN must 10 or 13 digits long',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: '1234567890123'
        },
        label: 'ISBN (10 or 13)',
        value: '',
        validation: {
          required: true,
          isISBN: true,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      genre: {
        elementType: 'select',
        elementConfig: {
          options: genres
        },
        label: 'Genre',
        value: 'Non-fiction',
        validation: {},
        valid: true
      },
      author: {
        showMessage: true,
        validationMessage: 'Author must be included',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'J.K. Rowling'
        },
        label: 'Author',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      stock: {
        showMessage: true,
        validationMessage: 'Stock must be included',
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: '1',
          step: '1',
          min: 0
        },
        label: 'Stock',
        value: '1',
        validation: {
          required: true,
          isInt: true,
        },
        valid: true,
        touched: false
      },
      price: {
        showMessage: true,
        validationMessage: 'Price must be included',
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: '23.09',
          step: '.01',
          min: 0
        },
        label: 'Price',
        value: '',
        validation: {
          required: true,
          isFloat: true
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false
  }

  checkValidity(value, rules) {
    let isValid = true;
    if(!rules) {
      return true;
    }
    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if(rules.isInt) {
      isValid = validator.isInt(value) && isValid
    }
    if(rules.isFloat) {
      isValid = validator.isFloat(value) && isValid
    }
    if(rules.isURL) {
      isValid = validator.isURL(value) && isValid
    }
    if(rules.isISBN) {
      isValid = (value.length === 10 || value.length === 13) && isValid
    }
    if(rules.isNumeric) {
      isValid = validator.isNumeric(value) && isValid;
    }
    return isValid;
  }
  //global input change handler
  inputChangedHandler = (event, inputIdentifier) => {
    //clone book data
    const updatedBookData = {
        ...this.state.bookData
    };
    //clone target input element by its identifier
    const updatedFormElement = {
        ...updatedBookData[inputIdentifier]
    };
    //update target input elements value
    updatedFormElement.value = event.target.value;
    //check if input should be declared valid
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    //calling this function means user interacted with input so touched = true
    updatedFormElement.touched = true;
    //pass updated input to updated form data
    updatedBookData[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    //check if all inputs are valid
    for (let inputIdentifier in updatedBookData) {
      formIsValid = updatedBookData[inputIdentifier].valid && formIsValid;
    }
    this.setState({bookData: updatedBookData, formIsValid: formIsValid});
  }

  mapInputsToObject = () => {
    const bookData = {};
    for(let key in this.state.bookData) {
      bookData[key] = this.state.bookData[key].value;
    }
    return bookData;
  }

  onAddBookHandler = (event) => {
    event.preventDefault();
    const bookData = this.mapInputsToObject();
    this.props.addBook(bookData, this.props.token);
  }

  render() {
    let successIndicator = null;
    //redirect user if unauthenticated or if a book as been added
    let redirect = (this.props.isAuthorized) ? null : <Redirect to="/" />;
    let redirectBookAdded = (this.props.bookAdded) ? <Redirect to="/" /> : null;
    const formElementsArray = []; //map form elements from state config
    for (let key in this.state.bookData) {
      formElementsArray.push({
          id: key,
          config: this.state.bookData[key]
      });
    }
    let formBtn = null;
    //is loading we replace add button with loading indicator
    if(this.props.loading) {
      formBtn = (
        <Spinner>Loading...</Spinner>
      );
    } else {
      formBtn = <Button buttonType="Success" enabled={this.state.formIsValid}>Add Book!</Button>
    }
    return (
      <div className={classes.AddBook}>
        {redirect}
        {redirectBookAdded}
        {successIndicator}
        <h1>Add a Book</h1>
        <div className={classes.Form}>
          <div className={classes.Preview}>
            {this.state.bookData.img_url.valid ? <img src={this.state.bookData.img_url.value} alt="preview failed" /> : null}
          </div>
          <form onSubmit={this.onAddBookHandler}>
            {formElementsArray.map(formElement => (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                label={formElement.config.label}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                showMessage={formElement.config.showMessage}
                validationMessage={formElement.config.validationMessage}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ))}
            {formBtn}
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    bookAdded: state.bc.bookAdded,
    isAuthorized: state.auth.isAuthorized,
    loading: state.bc.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addBook: (book, token) => {dispatch(actionCreators.addBook(book, token))},
    initBooks: () => {dispatch(actionCreators.initBooks())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(AddBook, axiosBooks));
