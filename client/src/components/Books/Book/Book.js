import React from 'react';
import classes from './Book.css';

const Book = (props) => (
  <div className={classes.Book}>
    <img src={props.img_url} alt={props.title} />
    {props.children}
  </div>
);

export default Book;
