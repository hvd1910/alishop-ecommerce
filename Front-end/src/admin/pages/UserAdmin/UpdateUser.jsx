import React from "react";
import { Box, Modal } from "@mui/material";
import UpdateUserForm from "../../components/BodyMain/user/UpdateUserForm";



const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "700px",
  outline: 'none',
  
} ;

const UpdateUser = ({handleClose, open, onUpdate, idObject}) => {
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
        <UpdateUserForm handleCancel={handleCancelClick} idObject={idObject} onUpdate={onUpdate}/>
        </Box>
    </Modal>
    )
  
}

export default UpdateUser