import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actionCreators from '../../store/actions/index';
import Login from '../../components/Auth/Login/Login';
import Aux from '../../hoc/auxillary/auxillary';
class Auth extends Component {
  static displayName = "[Component Auth]";

  state = {
    loginForm: {
      username: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'username'
        },
        label: 'Username',
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'password'
        },
        label: 'Password',
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false //prevents validations failing if input hasn't been focused into yet
      }
    },
    formIsValid: false,
  }
  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    return isValid;
  }
  inputChangedHandler = (event, inputIdentifier) => {
    console.log("input changed");
        const updatedLoginForm = {
            ...this.state.loginForm
        };
        const updatedFormElement = {
            ...updatedLoginForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedLoginForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedLoginForm) {
            formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({loginForm: updatedLoginForm, formIsValid: formIsValid});
    }

  loginHandler = (event) => {
    event.preventDefault();
    this.props.login(this.state.loginForm.username.value, this.state.loginForm.password.value);
  }

  render() {
    //if user is authorized then set a redirect
    const authRedirect = this.props.isAuthorized ? <Redirect to="/" /> : null;
    //loop over form config and generate an array that is more usable to produce
    //input elements with
    const formElementsArray = [];
    for (let key in this.state.loginForm) {
        formElementsArray.push({
            id: key,
            config: this.state.loginForm[key]
        });
    }
    return (
      <Aux>
        {authRedirect}
        <Login
          username={this.state.username}
          password={this.state.password}
          formElements={formElementsArray}
          inputChangedHandler={this.inputChangedHandler}
          loginEnabled={this.state.formIsValid}
          login={this.loginHandler}
          messages={this.props.errorMessages}/>
      </Aux>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessages: state.auth.messages,
    isAuthorized: state.auth.isAuthorized
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(actionCreators.login(username, password))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
