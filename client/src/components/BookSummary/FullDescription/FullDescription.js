import React from 'react';
import classes from './FullDescription.css';
import Authors from '../../Books/Book/Authors/Authors';

const FullDescription = (props) => {
  const stock = props.stock <= 0 ? <p>Stock: <span className="warning">Not In Stock</span></p> : <p>Stock: {props.stock} </p>
  return (
    <article className={classes.FullDescription}>
      <p>Title: {props.title}</p>
      <p>ISBN: {props.isbn_formatted}</p>
      <div classes={classes.Authors}>
        <p>Author{'(s)'}</p>
        <Authors authors={props.authors} />
      </div>
      <p>Genre: {props.genre}</p>
      {stock}
      <p>Cost: {props.cost}</p>
    </article>
  );
}

export default FullDescription;
