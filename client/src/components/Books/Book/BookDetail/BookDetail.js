import React from 'react';
import classes from './BookDetail.css';
import Authors from '../Authors/Authors.js';
const BookDetail = (props) => (
  <div className={classes.BookDetail}>
    <h2 className={classes.title}>{props.title}</h2>
    <div className={classes.author}><Authors authors={props.authors}/></div>
  </div>
);

export default BookDetail;
