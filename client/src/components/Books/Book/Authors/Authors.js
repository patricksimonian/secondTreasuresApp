import React from 'react';
import classes from './Authors.css';

const Authors = (props) => {
  const authorsList = props.authors.map((author, ind) => <li key={author.name + ind}>{author.name}</li>)
  return (
    <ul className={classes.Authors}>
      {authorsList}
    </ul>
  )
};

export default Authors;
