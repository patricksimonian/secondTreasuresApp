import React from 'react';
import classes from './Logo.css';

// import burgerLogo from '../../assets/images/burger_logo.png';

const Logo = (props) => (
  <div className={classes.Logo} style={{height: props.height}}>
    <img src="" alt="Burger Builder"/>
  </div>
);

export default Logo;
