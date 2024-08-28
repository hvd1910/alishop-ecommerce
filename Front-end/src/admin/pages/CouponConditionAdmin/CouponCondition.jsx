import React from "react";
import CreateUserForm from "../../components/BodyMain/user/CreateUserForm";
import { Box, Modal } from "@mui/material";
import CouponConditionLayout from "../../components/BodyMain/couponCondition/CouponConditionLayout";



const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "1000px",
  outline: 'none',
  
} ;

const CouponCondition = ({handleClose, open, couponId}) => {
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
        <CouponConditionLayout handleCancel={handleCancelClick} couponId={couponId}/>
        </Box>
    </Modal>
    )
  
}

export default CouponCondition