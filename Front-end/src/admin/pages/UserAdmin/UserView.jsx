import React from "react";
import CreateUserForm from "../../components/BodyMain/user/CreateUserForm";
import { Box, Modal } from "@mui/material";
import UserDetail from "../../components/BodyMain/user/UserDetail";



const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "700px",
  outline: 'none',
  
} ;

const UserView = ({handleClose, open, idObject} ) => {
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
        <UserDetail handleCancel={handleCancelClick} idObject={idObject}/>
        </Box>
    </Modal>
    )
  
}

export default UserView