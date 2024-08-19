import React from 'react'
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import ProductView from '../components/ProductView/ProductView';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "1000px",
  outline: 'none',
  boxShadow: 24,
  borderRadius: '8px'
  
} ;

const ProductQuickView = ({handleClose, open, onLoad, idProduct}) => {
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
      <ProductView handleCancel={handleCancelClick} onLoad={onLoad} idProduct={idProduct}/>
      </Box>
  </Modal>
  )
}

export default ProductQuickView
