import React, { Component } from 'react';
import PropTypes from 'prop-types';
class BookClub extends Component {
  static displayName = "";

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    return <div>Book Club</div>
  }
}

BookClub.propTypes = {};

export default BookClub;
