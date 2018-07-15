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
      {props.formElements.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => props.inputChangedHandler(event, formElement.id)} />
      ))}
      <Button buttonType="Success" enabled={props.loginEnabled}>Login</Button>
    </form>
  </div>
);

export default Login;
