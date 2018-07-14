import React from 'react';
import classes from './Book.css';
import BookDetail from './BookDetail/BookDetail';
const Book = (props) => (
  <div className={classes.Book}>
    <img src={props.img_url} alt={props.title} />
    <BookDetail title={props.title} authors={props.authors} />
  </div>
);

export default Book;
