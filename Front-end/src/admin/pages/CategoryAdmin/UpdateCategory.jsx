import React from 'react'
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import UpdateCategoryForm from '../../components/BodyMain/category/UpdateCategoryForm';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "500px",
  outline: 'none',
  
} ;

const UpdateCategory = ({idObject, handleClose, open, orderData, onUpdate}) => {
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
      <UpdateCategoryForm handleCancel={handleCancelClick} idObject={idObject} onUpdate={onUpdate} orderData={orderData}/>
      </Box>
  </Modal>
  )
}

export default UpdateCategory
