import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const NavigationItems = (props) => (
 <ul className={classes.NavigationItems}>
    <NavigationItem link="/">home</NavigationItem>
    <NavigationItem link="/login">employee login</NavigationItem>
 </ul>
);

export default NavigationItems;
