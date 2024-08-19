import React from 'react'
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import UpdateOrderForm from '../../components/BodyMain/order/UpdateOrderForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "500px",
  outline: 'none',
  
} ;

const UpdateOrder = ({idObject, handleClose, open, orderData, onLoad}) => {
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
      <UpdateOrderForm handleCancel={handleCancelClick} idObject={idObject} onLoad={onLoad} orderData={orderData}/>
      </Box>
  </Modal>
  )
}

export default UpdateOrder
