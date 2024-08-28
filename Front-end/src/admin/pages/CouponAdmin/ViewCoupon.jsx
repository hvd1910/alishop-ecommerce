import React from "react";
import { Box, Modal } from "@mui/material";
import CouponDetail from "../../components/BodyMain/coupon/CouponDetail";



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "500px",
  outline: 'none',
  
} ;

const ViewCoupon = ({handleClose, open, idObject} ) => {
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
        <CouponDetail handleCancel={handleCancelClick} idObject={idObject}/>
        </Box>
    </Modal>
    )
  
}

export default ViewCoupon