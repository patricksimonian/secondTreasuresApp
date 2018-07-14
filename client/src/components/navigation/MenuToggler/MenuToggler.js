import React from 'react';
import classes from './MenuToggler.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Aux from  '../../../hoc/auxillary/auxillary';
const MenuToggler = (props) => (
  <Aux>
    <div className={classes.MobileOnly} onClick={props.open}>
      <FontAwesomeIcon icon={faBars} color="inherit"/>
    </div>
  </Aux>
);

export default MenuToggler;
