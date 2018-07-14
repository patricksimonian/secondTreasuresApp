import React from 'react';
import classes from './CheckoutSummary.css';
import Burger from  '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope your burg tastes goodddd :{')'}</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
        <h2>Total: <strong>{props.total.toFixed(2)}</strong></h2>
      </div>
      <Button
        buttonType="Danger"
        clicked={props.onCheckoutCancelled}>CANCEL</Button>
      <Button
        buttonType="Success"
        clicked={props.onCheckoutContinued}>PAY NOW</Button>
    </div>
  )
};

export default CheckoutSummary;
