import React from 'react'
import { Box, Modal } from '@mui/material';
import CreateProductForm from '../../components/BodyMain/product/CreateProductForm';


const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "700px",
  outline: 'none',
  
} ;

const AddProduct = ({handleClose, open, onCreate}) => {
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
        <CreateProductForm handleCancel={handleCancelClick} onCreate={onCreate}/>
        </Box>
    </Modal>
    )
  
}

export default AddProduct
