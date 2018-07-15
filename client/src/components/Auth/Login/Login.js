import React from 'react';
import classes from './Login.css';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
const Login = (props) => (
  <div className={classes.Login}>
    <p>Employee Login Portal</p>
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
