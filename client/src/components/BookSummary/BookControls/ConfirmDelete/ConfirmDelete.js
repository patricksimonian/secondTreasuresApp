import React from 'react';
import Modal from '../../../UI/Modal/Modal';
import Button from '../../../UI/Button/Button';

const ConfirmDelete = (props) => (
  <Modal show modalClosed={props.closeView}>
    <h2>Are you sure you'd like to delete this book?</h2>
    <Button
      buttonType="Danger"
      clicked={props.confirmDelete}>Delete</Button>
    <Button
      buttonType="Neutral"
      clicked={props.goBack}>Go Back</Button>
  </Modal>
);

export default ConfirmDelete;
