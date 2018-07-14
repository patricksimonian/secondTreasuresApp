import React from 'react';
import classes from './Books.css';
//components
import BasicDescription from './Book/BasicDescription/BasicDescription';
import Book from './Book/Book';
const Books = (props) => {
  const booksList = props.books.map(book => {

    return <Book
              img_url={book.img_url}
              isbn={book.isbn_formatted}
              key={book.isbn}>
              <BasicDescription title={book.title} authors={book.authors} clicked={() => {
                props.viewBook(book.isbn);
              }}/>
          </Book>
  });

  return (
    <section className={classes.Books}>
      {booksList}
    </section>
  );
}

export default Books;
