import React, { useEffect, useState } from 'react'
import All_API from '../../../../State/Auth/All_API'
import InputLayout from '../../Input/InputLayout'
import { ConvertDateTime } from '../Convert/Convert'
import { ToastError, ToastSuccess } from '../notification/Notification'

const UpdateCategoryForm = ({idObject, handleCancel, onUpdate}) => {

	const [category, setCategory] = useState()


	async function getCategoryById() {
		try{
		  const response = await All_API.getCategoryById(idObject)
		  setCategory(response.data)
		}catch {
			ToastError("please try again")
			handleCancel()
		}
	  }
	
	  useEffect(()=> {
		getCategoryById()
	  }, [])


	const handleUpdate = (event)=> {
		event.preventDefault();
	
		const data = new FormData(event.currentTarget);
		const catgoryData = {
			name: data.get("name"),
		};
		updateCategory(idObject, catgoryData)
		
	  }

	  async function updateCategory(id, catgoryData) {
		try{
		  const response = await All_API.updateCategory(id, catgoryData)
		  if(response.data.status === "success") {
			  ToastSuccess(response.data.message)
			  onUpdate()
			  handleCancel()
		  }else {
			  ToastError(response.data.message)
			handleCancel()
		  }
		}catch {
		  ToastError("please try again")
		}
	  }


  return (
    <div className="row">
						<div className="">
							<div className="ec-cat-list card card-default mb-24px">
								<div className="card-body">
									<div className="ec-cat-form">
										<h4>Edit Category</h4>

										<form className="row" onSubmit={handleUpdate}>
											<div className="form-group col-12 ">
												   <label htmlFor="text" className="col-form-label">ID Category</label> 
													<input id="id" name="category_id" className="form-control-2 here slug-title" type="text" disabled value={idObject}/>
											</div>

                                            <div className="form-group col-12 ">
												   <label htmlFor="text" className="col-form-label">Category name</label> 
												   <InputLayout name="name"  type="text" value={category?.name}/>
											</div>

											<div className="form-group col-6 ">
												   <label htmlFor="text" className="col-form-label">Created At</label> 
													<input id="createdAt" name="createdAt" className="form-control-2 here slug-title" type="text"  value={ConvertDateTime(category?.createdAt)} disabled/>
											</div>
											<div className="form-group col-6 ">
												   <label htmlFor="text" className="col-form-label">Updated At</label> 
													<input id="updatedAt" name="updatedAt" className="form-control-2 here slug-title" type="text"  value={ConvertDateTime(category?.updatedAt)} disabled/>
											</div>

											<div className="row">
												<div className="col-12 ">
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

export default UpdateCategoryForm
