import React from 'react';
import Confirm from '../../../UI/Modal/Confirm/Confirm';
const ConfirmDelete = (props) => (
  <Confirm closeView={props.closeView}
      message="Are you sure you'd like to delete this book?"
      confirmed={props.confirmDelete}
      confirmName="Delete"
      canceled={props.goBack}
      cancelName="Go Back"/>
);

export default ConfirmDelete;
