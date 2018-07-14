import React from 'react';
import classes from './BookSummary.css';

import Aux from '../../hoc/auxillary/auxillary';
import Book from '../Books/Book/Book';
import BookData from './BookData/BookData';

const BookSummary = (props) => {
  return (
    <div className={classes.BookSummary}>
      <Book img_url={props.img_url} isbn={props.isbn} />
      <BookData />
    </div>
  )
};

export default BookSummary;
