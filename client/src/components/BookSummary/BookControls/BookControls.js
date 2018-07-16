import React from 'react';
import classes from './BookControls.css';
import Button from '../../UI/Button/Button';

const BookControls = (props) => (
  <div className={classes.BookControls}>
    <Button buttonType="Danger" clicked={props.onDelete}>Delete</Button>
    {/*<Button buttonType="Neutral">Edit</Button> Not implementing yet*/}
  </div>
);

export default BookControls;
