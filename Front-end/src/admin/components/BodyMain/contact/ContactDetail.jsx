import React, { useEffect, useState } from 'react'
import InputLayout from '../../Input/InputLayout'
import All_API from '../../../../State/Auth/All_API'
import { ToastError, ToastSuccess } from '../notification/Notification'
import { ConvertDateTime } from '../Convert/Convert'

const ContactDetail = ({idObject, handleCancel, onUpdate}) => {
    const [contact, setContact] = useState()

	async function getContactById() {
		try{
		  const response = await All_API.getContactById(idObject)
		  setContact(response.data.data)
		}catch {
			ToastError("please try again")
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
                    <h4>View Contact</h4>

                    <form className="row" >
                      

                        <div className="form-group col-6 ">
                               <label htmlFor="text" className="col-form-label"> Full Name</label> 
                               <input id="name" name="name" className="form-control-2 here slug-title" type="text"  value={contact?.name} disabled/>
                        </div>

                        <div className="form-group col-6 ">
                               <label htmlFor="text" className="col-form-label"> Email</label> 
                               <input id="email" name="email" className="form-control-2 here slug-title" type="text"  value={contact?.email} disabled/>
                               </div>

                               <div className="form-group col-12 ">
                               <label htmlFor="text" className="col-form-label"> Message</label> 
                               <textarea id="message" name="message" className="form-control-2 here slug-title" type="text"  value={contact?.message} disabled/>
                               </div>

                               <div className="form-group col-12 ">
                               <label htmlFor="text" className="col-form-label"> Reply</label> 
                               <textarea id="reply" name="reply" className="form-control-2 here slug-title" type="text" description='Reply to messages' disabled value={contact?.reply}/>
                               </div>

                               <div className="form-group col-6 ">
												   <label htmlFor="text" className="col-form-label">Created At</label> 
													<input id="createdAt" name="createdAt" className="form-control-2 here slug-title" type="text"  value={ConvertDateTime(contact?.createdAt)} disabled/>
											</div>
											<div className="form-group col-6 ">
												   <label htmlFor="text" className="col-form-label">Updated At</label> 
													<input id="updatedAt" name="updatedAt" className="form-control-2 here slug-title" type="text"  value={ConvertDateTime(contact?.updatedAt)} disabled/>
											</div>
                      <div className="row ">
												<div className="col-12 ">
                                                    <button onClick={()=>handleCancel()} className="btn btn-border ">Cancel</button>
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

export default ContactDetail
