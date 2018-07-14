import React from 'react';
import classes from './Logo.css';

import treasureLogo from '../../assets/images/treasuremap.png';

const Logo = (props) => (
  <div className={classes.Logo} style={{height: props.height}}>
    <img src={treasureLogo} alt="Second Treasures"/>
    <span className={classes.caption}>Second Treasures</span>
  </div>
);

export default Logo;
