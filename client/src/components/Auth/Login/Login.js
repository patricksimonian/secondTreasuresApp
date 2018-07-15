import React from 'react';
import classes from './Login.css';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import MessageList from '../../UI/MessageList/MessageList';
const Login = (props) => (
  <div className={classes.Login}>
    <p>Employee Login Portal</p>
    <MessageList messages={props.messages} />
    <form onSubmit={props.login} >
      <Input
        type="text"
        placeholder="username"
        value={props.username}
        onChange={props.usernameChanged} />

      <Input
        type="password"
        placeholder="password"
        value={props.password}
        onChange={props.passwordChanged} />
      <Button buttonType="Success" enabled={props.loginEnabled}>Login</Button>
    </form>
  </div>
);

export default Login;
