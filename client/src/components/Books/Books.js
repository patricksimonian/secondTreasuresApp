import React from 'react';
import classes from './Books.css';

//components
import Book from './Book/Book';
const Books = (props) => {
  const booksList = props.books.map(book => {
    
    return <Book
              authors={book.authors}
              img_url={book.img_url}
              stock={book.stock}
              price={book.price}
              title={book.title}
              isbn={book.isbn_formatted}
              key={book.isbn} />
  });

  return (
    <div className={classes.Books}>
      {booksList}
    </div>
  );
}

export default Books;
