import React from 'react';
import classes from './MenuToggler.css';
import Aux from  '../../../hoc/auxillary/auxillary';
const MenuToggler = (props) => (
  <Aux>
    <div className={classes.MobileOnly} onClick={props.open}></div>
  </Aux>
);

export default MenuToggler;
