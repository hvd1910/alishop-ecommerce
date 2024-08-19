import React from 'react'
import CreateCategoryForm from '../../components/BodyMain/category/CreateCategoryForm'
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "500px",
  outline: 'none',
  
} ;

const AddCategory = ({handleClose, open, onCreate}) => {
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
      <CreateCategoryForm handleCancel={handleCancelClick} onCreate={onCreate}/>
      </Box>
  </Modal>
  )
}

export default AddCategory
