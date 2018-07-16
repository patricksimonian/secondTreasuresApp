import React, {Component} from 'react';
import classes from './BookSearch.css';
import Input from '../UI/Input/Input';
import genres from '../../assets/genres.json';
class BookSearch extends Component {
  state = {
    searchForm: {
      keywords: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'title or author'
        },
        value: '',
        label: 'Search',
        validation: {},
        valid: true,
        touched: false
      },
      genre: {
        elementType: 'select',
        elementConfig: {
            options: [{value: 'any', displayValue: 'All'}].concat(genres)
        },
        label: 'Genres',
        value: 'any',
        valid: true,
        touched: false
      }
    }
  }
  //global input change handler
  inputChangedHandler = (event, inputIdentifier) => {
    //clone book data
    const updatedSearch = {
        ...this.state.searchForm
    };
    //clone target input element by its identifier
    const updatedFormElement = {
        ...updatedSearch[inputIdentifier]
    };
    //update target input elements value
    updatedFormElement.value = event.target.value;
    //calling this function means user interacted with input so touched = true
    updatedFormElement.touched = true;
    //pass updated input to updated form data
    updatedSearch[inputIdentifier] = updatedFormElement;

    this.setState({searchForm: updatedSearch}, () => {
      //call props to filter books
      this.props.onFilter(this.state.searchForm.keywords.value, this.state.searchForm.genre.value);
    });
  }
  render() {
    const formElementsArray = []; //map form elements from state config
    for(let key in this.state.searchForm) {
      formElementsArray.push({
          id: key,
          config: this.state.searchForm[key]
      });
    }
    return (
      <div className={classes.Search}>
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
      </div>
    );
  }
}

export default BookSearch;
