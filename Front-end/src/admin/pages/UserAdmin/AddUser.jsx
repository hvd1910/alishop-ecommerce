import React from "react";
import CreateUserForm from "../../components/BodyMain/user/CreateUserForm";
import { Box, Modal } from "@mui/material";



const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "700px",
  outline: 'none',
  
} ;

const AddUser = ({handleClose, open, onCreate}) => {
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
        <CreateUserForm handleCancel={handleCancelClick} onCreate={onCreate}/>
        </Box>
    </Modal>
    )
  
}

export default AddUser