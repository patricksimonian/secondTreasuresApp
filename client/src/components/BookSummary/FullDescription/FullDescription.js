import React from 'react';
import classes from './FullDescription.css';
import Authors from '../../Books/Book/Authors/Authors';

const FullDescription = (props) => {
  const stock = props.stock <= 0 ? <p>Stock: <span className="warning">Not In Stock</span></p> : <p>Stock: {props.stock} </p>
  return (
    <article className={classes.FullDescription}>
      <h3>{props.title}</h3>
      <div className={classes.Authors}>
        <p><small>Author{'(s)'}:</small></p>
        <Authors authors={props.authors} />
      </div>
      <p>ISBN: {props.isbn_formatted}</p>
      <p>Genre: {props.genre}</p>
      {stock}
      <p>Cost: {props.cost}</p>
    </article>
  );
}

export default FullDescription;
