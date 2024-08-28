import React, { useEffect, useState } from 'react'
import All_API from '../../../../State/Auth/All_API'
import { ToastError, ToastSuccess } from '../notification/Notification'
import { ConvertDateTime } from '../Convert/Convert'

const CouponDetail = ({idObject, handleCancel}) => {
	const [coupon, setCoupon] = useState()

	async function getContactById() {
		try{
		  const response = await All_API.getCouponById(idObject)
		  setCoupon(response.data.data)
		}catch (error) {
            ToastError(error.response.data.message);
			handleCancel()
		}
	  }
	
	  useEffect(()=> {
		getContactById()
	  }, [])

	

	 

  return (
    <div className="row">
    <div className="">
        <div className="ec-cat-list card card-default mb-24px">
            <div className="card-body">
                <div className="ec-cat-form">
                    <h4>View Coupon</h4>

                    <form className="row" >
                      

                        <div className="form-group col-6 ">
                               <label htmlFor="text" className="col-form-label"> ID Coupon</label> 
                               <input id="code" name="code" className="form-control-2 here slug-title" type="text"  value={coupon?.id} disabled/>
                        </div>
                        <div className="form-group col-6 ">
                               <label htmlFor="text" className="col-form-label"> Code Coupon</label> 
                               <input id="code" name="code" className="form-control-2 here slug-title" type="text"  value={coupon?.code} disabled/>
                        </div>

                        <div className="form-group col-6 ">
                               <label htmlFor="text" className="col-form-label"> Useage Limit</label> 
                               <input id="usageLimit" name="usageLimit" className="form-control-2 here slug-title" type="number"  value={coupon?.usageLimit} disabled/>
                               </div>

                               <div className="form-group col-6 ">
                               <label htmlFor="text" className="col-form-label">Active</label> 
                               <input id="active" name="active" className="form-control-2 here slug-title" type="text"  value={coupon?.active.toString().toUpperCase()} disabled/>
                               </div>


                               <div className="row">
												<div className="col-12">
                                                    <button onClick={()=>handleCancel()} className="btn btn-border mr-4">Cancel</button>
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

export default CouponDetail
