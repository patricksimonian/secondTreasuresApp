import React from 'react';
import classes from './BookControls.css';
import Button from '../../UI/Button/Button';

const BookControls = (props) => (
  <div>
    <Button buttonType="Danger" clicked={props.onDelete}>Delete</Button>
    <Button buttonType="Neutral">Edit</Button>
  </div>
);

export default BookControls;