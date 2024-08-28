import React from 'react'
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import UpdateCouponForm from '../../components/BodyMain/coupon/UpdateCouponForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "500px",
  outline: 'none',
  
} ;

const UpdateCoupon = ({idObject, handleClose, open, onUpdate}) => {
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
      <UpdateCouponForm handleCancel={handleCancelClick} idObject={idObject} onUpdate={onUpdate} />
      </Box>
  </Modal>
  )
}

export default UpdateCoupon
