import { Box, Modal } from '@mui/material';
import React, {  useEffect, useState } from 'react'
import InputLayout from '../../Input/InputLayout';
import All_API from '../../../../State/Auth/All_API';
import { ToastError, ToastSuccess } from '../notification/Notification';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "500px",
    outline: 'none',
    
  } ;
  
  const UpdateProductDetail = ({ handleClose, open, idObject,  onUpdate}) => {
    const [productDetail, setProductDetail] = useState(null)
    const handleUpdate = (event)=> {
		event.preventDefault();
	
		const data = new FormData(event.currentTarget);
		const productDetailData = {
			size: data.get("size"),
            color: data.get("color"),
            qty: data.get("qty"),
		};
        UpdateProductDetail(idObject, productDetailData)
		
	  }

      async function UpdateProductDetail(id,productData) {
        try{
          const response = await All_API.updateProductDetail(id, productData)
          if(response.data.status === "success") {
      
              ToastSuccess(response.data.message)
              onUpdate()
              handleClose()
          }else {
              ToastError(response.data.message)
              handleClose()

          }
        }catch (error){
          ToastError(error.response.data.message)
          handleClose()
        }
      }

      async function getProductDetailById(id) {
		try{
		  const response = await All_API.getProductDetail(id)
          if(response.data.status === "success") {
            setProductDetail(response.data.data)
          }else {
            ToastError(response.data.status)
            handleClose()
          }
		}catch {
			ToastError("please try again")
			handleClose()
		}
	  }


      const handleCancelClick = () => {
        handleClose()
      };
  

      useEffect(()=> {
        if(open) {
            getProductDetailById(idObject);
        }
      }, [open])
  

    return (
      <Modal
      open={open ? open : false}
      onClose={handleCancelClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
        <div className="row">
						<div className="">
							<div className="ec-cat-list card card-default mb-24px">
								<div className="card-body">
									<div className="ec-cat-form">
										<h4>Edit Product Detail</h4>

										<form className="row" onSubmit={handleUpdate}>
											<div className="form-group col-6 ">
												   <label htmlFor="text" className="col-form-label">ID Product Detail</label> 
													<input id="id" name="category_id" className="form-control-2 here slug-title" type="text" disabled value={idObject}/>
											</div>

                                            <div className="form-group col-6 ">
												   <label htmlFor="text" className="col-form-label">Size</label> 
												   <InputLayout name="size"  type="text" value={productDetail?.size}/>
											</div>

                                            <div className="form-group col-6 ">
												   <label htmlFor="text" className="col-form-label">Color</label> 
                                                   <InputLayout name="color"  type="text" value={productDetail?.color}/>

											</div>
											<div className="form-group col-6 ">
												   <label htmlFor="text" className="col-form-label">Quantity</label> 
                                                   <InputLayout name="qty"  type="text" value={productDetail?.qty}/>

											</div>
										

											<div className="row">
												<div className="col-12">
													<button name="submit" type="submit" className="btn btn-primary btn-admin">Update</button>
												</div>
											</div>

										</form>

									</div>
								</div>
							</div>
						</div>
					</div>

        </Box>
    </Modal>
    )
  }
  
  export default UpdateProductDetail
