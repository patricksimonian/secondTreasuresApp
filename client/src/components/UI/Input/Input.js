import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    let validationMessage= null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    if(props.showMessage && props.validationMessage && props.invalid && props.touched) {
      validationMessage = <p className={classes.Message}>{props.validationMessage}</p>
    }
    switch( props.elementType ) {
      case ( 'input' ):
        inputElement = <input
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />;
        break;
      case ( 'textarea' ):
        inputElement = <textarea
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />;
        break;
      case ( 'select' ):
        inputElement = (
            <select
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
        );
        break;
      default:
        inputElement = <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {validationMessage}
            {inputElement}
        </div>
    );

};

export default input;
