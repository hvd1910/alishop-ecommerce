import React from 'react'
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import UpdateContactForm from '../../components/BodyMain/contact/UpdateContactForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "500px",
  outline: 'none',
  
} ;

const UpdateContact = ({idObject, handleClose, open, orderData, onUpdate}) => {
  const handleCancelClick = () => {
    handleClose()
  };
  return (
    <Modal
    open={open ? open : false}
    onClose={handleCancelClick}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
      <Box sx={style}>
      <UpdateContactForm handleCancel={handleCancelClick} idObject={idObject} onUpdate={onUpdate} orderData={orderData}/>
      </Box>
  </Modal>
  )
}

export default UpdateContact
