import React from 'react';
import classes from './MenuToggler.css';
import Aux from  '../../../hoc/auxillary/auxillary';
const MenuToggler = (props) => (
  <Aux>
    <div className={classes.MobileOnly} onClick={props.open}>MENU2</div>
    <div className={classes.DesktopOnly}>MENU</div>
  </Aux>
);

export default MenuToggler;
