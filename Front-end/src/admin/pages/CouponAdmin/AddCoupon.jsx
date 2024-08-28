import React from 'react'
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import CreateCouponForm from '../../components/BodyMain/coupon/CreateCouponForm';

const style = {
  position: 'absolute',
  top: '44%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "500px",
  outline: 'none',
  
} ;

const AddCoupon = ({handleClose, open, onCreate}) => {
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
      <CreateCouponForm handleCancel={handleCancelClick} onCreate={onCreate}/>
      </Box>
  </Modal>
  )
}

export default AddCoupon
