import React from 'react';
import classes from './BasicDescription.css';
import Authors from '../Authors/Authors.js';

const BasicDescription = (props) => (
  <div className={classes.BasicDescription} onClick={props.clicked}>
    <h2 className={classes.title}>{props.title}</h2>
    <div className={classes.author}><Authors authors={props.authors}/></div>
  </div>
);

export default BasicDescription;
