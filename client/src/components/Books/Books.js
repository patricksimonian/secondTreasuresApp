import React from 'react';
import classes from './Books.css';
//components
import BasicDescription from './Book/BasicDescription/BasicDescription';
import Book from './Book/Book';
import Aux from '../../hoc/auxillary/auxillary';
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
    <Aux>
      <header className={classes.Header}>
        <h1>Second Treasures Book Club</h1>
        <p><strong>We meet monthly!</strong></p>
      </header>
      <section>
        <div className={classes.Books}>
          {booksList}
        </div>
      </section>
    </Aux>
  );
}

export default Books;
