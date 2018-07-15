import React, { Component } from 'react';
import {connect} from 'react-redux';
import {login} from '../../store/actions/index';
import Login from '../../components/Auth/Login/Login';
class Auth extends Component {
  static displayName = "[Component Auth]";

  state = {
    username: '',
    password: ''
  }

  componentDidMount() {

  }

  usernameChangedHandler = (event) => {
    this.setState({username: event.target.value});
  }

  passwordChangedHandler = (event) => {
    this.setState({password: event.target.value});
  }

  render() {
    //disable button if the input fields are empty
    const buttonEnabled = this.state.username.trim() !== '' && this.state.password.trim() !== '';
    return (
      <Login
        username={this.state.username}
        password={this.state.password}
        passwordChanged={this.passwordChangedHandler}
        usernameChanged={this.usernameChangedHandler}
        loginEnabled={buttonEnabled}
        login={this.props.login}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(login(username, password))
  };
}


export default Auth;
