import React, { useEffect, useState } from 'react'
import All_API from '../../../../State/Auth/All_API'
import InputLayout from '../../Input/InputLayout'
import { ToastError, ToastSuccess } from '../notification/Notification'
import SelectActiveLayout from '../../Input/SelectActiveLayout'


const UpdateCouponForm = ({idObject, handleCancel, onUpdate}) => {

	const [coupon, setCoupon] = useState()


	async function getCouponById() {
		try{
		  const response = await All_API.getCouponById(idObject)
		  setCoupon(response.data.data)
		}catch (error) {
            ToastError(error.response.data.message);
			handleCancel()
		}
	  }
	
	  useEffect(()=> {
		getCouponById()
	  }, [])


	const handleUpdate = (event)=> {
		event.preventDefault();
	
		const data = new FormData(event.currentTarget);
		const couponData = {
			code: data.get("code"),
            usage_limit: data.get("usage_limit"),
			active: data.get("active") === "true",

		};

		updateCoupon(idObject, couponData)
		
	  }

	  async function updateCoupon(id, couponData) {
		try{
		  const response = await All_API.updateCoupon(id, couponData)
		  if(response.data.status === "success") {
			  ToastSuccess(response.data.message)
			  onUpdate()
			  handleCancel()
		  }else {
			  ToastError(response.data.message)
			handleCancel()
		  }
		}catch (error) {
            ToastError(error.response.data.message);
            handleCancel()
        }
	  }


  return (
    <div className="row">
						<div className="">
							<div className="ec-cat-list card card-default mb-24px">
								<div className="card-body">
									<div className="ec-cat-form">
										<h4>Edit Coupon</h4>

										<form className="row" onSubmit={handleUpdate}>
											<div className="form-group col-12 ">
												   <label htmlFor="text" className="col-form-label">ID Coupon</label> 
													<input id="id" name="category_id" className="form-control-2 here slug-title" type="text" disabled value={idObject}/>
											</div>

                                            <div className="form-group col-12 ">
												   <label htmlFor="text" className="col-form-label">Code Coupon</label> 
												   <InputLayout name="code"  type="text" value={coupon?.code}/>
											</div>

                                            <div className="form-group col-12 ">
												   <label htmlFor="text" className="col-form-label">Useage Limit</label> 
												   <InputLayout name="usage_limit"  type="number" value={coupon?.usageLimit}/>
											</div>

											<div className="form-group col-md-12">
														<SelectActiveLayout nameObject="active" label="Active"  initialValue={coupon?.active}/>
														</div>

											<div className="row">
												<div className="col-12">
                                                    <button onClick={()=>handleCancel()} className="btn btn-border mr-4">Cancel</button>
													<button name="submit" type="submit" className="btn btn-primary btn-admin">Update</button>
												</div>
											</div>

										</form>

									</div>
								</div>
							</div>
						</div>
					</div>
  )
}

export default UpdateCouponForm
