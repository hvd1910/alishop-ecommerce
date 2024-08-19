import { Box, Modal } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ToastError, ToastSuccess } from '../notification/Notification';
import All_API from '../../../../State/Auth/All_API';

const DeleteLayout = ({handleClose, open,idObject, deleteFunction}) => {
    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "500px",
        outline: 'none',
      };

      const handleDelete = () => {
        deleteFunction(idObject)
      }

      const handleCancelClick = () => {
        handleClose()
      };
      


  return (
    <Modal
        open={open? open : false}
        onClose={handleCancelClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}> 
        
       


<div id="deleteModal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden  top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="box-delete relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            
            <svg className="text-gray-400 icon-delete dark:text-gray-500 w-2.5 h-2.5 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
</svg>
            <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
            <div className="flex justify-center items-center space-x-4">
                <button data-modal-toggle="deleteModal" type="button" className="btn-confirm btn-cancel " onClick={handleCancelClick}>
                    No, cancel
                </button>
                <button onClick={handleDelete} type="submit" className=" btn-confirm delete-confirm-btn  text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                    Yes, I'm sure
                </button>
            </div>
        </div>
    </div>
</div>

        </Box>
      </Modal>
  )
}

export default DeleteLayout
