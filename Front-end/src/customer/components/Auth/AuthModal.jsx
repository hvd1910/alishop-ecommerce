import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm"


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    outline: 'none',
    boxShadow: 24,
    p:4,
    borderRadius: '8px'
    
} ;


const AuthModal = ({handleClose, open}) => {
    const location = useLocation()

    
   const closeModal = ()=> {
    handleClose()
   }
    
  return (
    <div >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          {location.pathname ==="/login" ? <LoginForm closeModal={closeModal}/> : <RegisterForm />}

        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;
