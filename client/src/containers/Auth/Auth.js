import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actionCreators from '../../store/actions/index';
import Login from '../../components/Auth/Login/Login';
import Aux from '../../hoc/auxillary/auxillary';
class Auth extends Component {
  static displayName = "[Component Auth]";

  state = {
    username: '',
    password: ''
  }
  usernameChangedHandler = (event) => {
    this.setState({username: event.target.value});
  }

  passwordChangedHandler = (event) => {
    this.setState({password: event.target.value});
  }

  loginHandler = (event) => {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  render() {
    //disable button if the input fields are empty
    const buttonEnabled = this.state.username.trim() !== '' && this.state.password.trim() !== '';
    //if user is authorized then set a redirect
    const authRedirect = this.props.isAuthorized ? <Redirect to="/" /> : null;
    return (
      <Aux>
        {authRedirect}
        <Login
          username={this.state.username}
          password={this.state.password}
          passwordChanged={this.passwordChangedHandler}
          usernameChanged={this.usernameChangedHandler}
          loginEnabled={buttonEnabled}
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
