import React from "react";
import CreateUserForm from "../../components/BodyMain/user/CreateUserForm";
import { Box, Modal } from "@mui/material";
import ContactDetail from "../../components/BodyMain/contact/ContactDetail";



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "500px",
  outline: 'none',
  
} ;

const ViewContact = ({handleClose, open, idObject} ) => {
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
        <ContactDetail handleCancel={handleCancelClick} idObject={idObject}/>
        </Box>
    </Modal>
    )
  
}

export default ViewContact