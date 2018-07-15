import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuToggler from '../MenuToggler/MenuToggler';

import classes from './Toolbar.css';
const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <MenuToggler open={props.sideDrawerOpen} />
    <Logo />
    <nav className={classes.DesktopOnly}><NavigationItems isAuthorized={props.isAuthorized}/></nav>
  </header>
);

export default toolbar;
