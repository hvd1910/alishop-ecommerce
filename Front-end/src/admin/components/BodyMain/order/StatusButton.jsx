import React from 'react'
import { ToastError, ToastSuccess } from '../notification/Notification'
import All_API from '../../../../State/Auth/All_API'

const StatusButton = ({id, status, onLoad}) => {

    const handleUpdateStatus = (status)=> {
        if(status !== 0){
          async function updateOrderStatus(id, status) {
            try{
              const response = await All_API.updateOrderStatus(id, status)
              if(response.data.status === "success") {
                ToastSuccess(response.data.message)
                onLoad()
              }else {
                ToastError(response.data.message)
              }
            }catch (error){
              ToastError(error.response.data.message)
            }
          }
          updateOrderStatus(id,status)
        }
  
      }


  return (
    <button className="badge badge-info btn-status"onClick={()=>{
        handleUpdateStatus(
      status ==="pending" ? 'processing' : status === "processing" ? "shipped" : 
      status === "shipped" ? "delivered" : 0 , id
      )}
    }
      >{
      status ==="pending" ? 'Aprroved' : status === "processing" ? "Packed" : 
       status === "shipped" ? "Shipped" : status === "delivered"  ? "Delivered" : ''}</button>
  )
}

export default StatusButton
