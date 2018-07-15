import React from 'react';

import classes from './Button.css';
import PropTypes from 'prop-types'
const button = (props) => (
  <button
    disabled={!props.enabled}
    onClick={props.clicked}
    className={[classes.Button, classes[props.buttonType]].join(" ")}>{props.children}</button>
);

button.displayName = '[Component Button]';
button.propTypes = {}
export default button;
