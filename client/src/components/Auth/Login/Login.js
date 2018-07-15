import React from 'react';
import classes from './Login.css';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
const Login = (props) => (
  <div className={classes.Login}>
    <p>Employee Login Portal</p>
    <form onSubmit={() => {props.login(this.state.username, this.state.password)}} >
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
      <Button buttonType="Success" buttonEnabled={props.buttonEnabled}>Login</Button>
    </form>
  </div>
);

export default Login;
