import React from 'react'
import All_API from '../../../../State/Auth/All_API';
import { ToastError, ToastSuccess } from '../notification/Notification';

const CreateCouponForm = ({handleCancel, onCreate}) => {


    const handleSubmit = (event) => {
		event.preventDefault();
	
		const data = new FormData(event.currentTarget);
		const couponData = {
			code: data.get("code"),
            usage_limit: data.get("usage_limit")
		};
		createCoupon(couponData)
		
	  }


		async function createCoupon(couponData) {
		  try{
			const response = await All_API.createCoupon(couponData)
			if(response.data.status === "success") {
				ToastSuccess(response.data.message)
				onCreate()
				handleCancel()
			}else {
				ToastError(response.data.message)
				handleCancel()
			}
        }catch (error){
            ToastError(error.response.data.message)
			handleCancel()
		  }
		}


  return (
    <div className="row">
						<div className="">
							<div className="ec-cat-list card card-default mb-24px">
								<div className="card-body">
									<div className="ec-cat-form">
										<h4>Add New Coupon</h4>

										<form className="row" onSubmit={handleSubmit}>
											<div className="form-group col-12 ">
												   <label htmlFor="text" className="col-form-label">Code Coupon</label> 
													<input id="code" name="code" className="form-control-2 here slug-title" type="text" placeholder='ABC12' />
											</div>
                                            <div className="form-group col-12 ">
												   <label htmlFor="text" className="col-form-label">Useage Limit</label> 
													<input id="usage_limit" name="usage_limit" className="form-control-2 here slug-title" type="number" placeholder='123'/>
											</div>
                                          

											<div className="row">
												<div className="col-12">
                                                    <button onClick={()=>handleCancel()} className="btn btn-border mr-4">Cancel</button>
													<button name="submit" type="submit" className="btn btn-primary btn-admin">Submit</button>
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

export default CreateCouponForm
