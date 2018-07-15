import React from 'react';
import classes from './BookSummary.css';
import Aux from '../../hoc/auxillary/auxillary';
import Book from '../Books/Book/Book';
import BookData from './BookData/BookData';
import FullDescription from './FullDescription/FullDescription';

const BookSummary = (props) => {
  return (
    <div className={classes.BookSummary}>
      <Book img_url={props.img_url} isbn={props.isbn} />
      <FullDescription
        authors={props.authors}
        title={props.title}
        isbn_formatted={props.isbn_formatted}
        genre={props.genre}
        cost={props.cost}
        stock={props.stock} />
    </div>
  )
};

export default BookSummary;
