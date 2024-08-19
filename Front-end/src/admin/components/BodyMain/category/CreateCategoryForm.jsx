import React from 'react'
import All_API from '../../../../State/Auth/All_API';
import { ToastError, ToastSuccess } from '../notification/Notification';

const CreateCategoryForm = ({handleCancel, onCreate}) => {


    const handleSubmit = (event) => {
		event.preventDefault();
	
		const data = new FormData(event.currentTarget);
		const catgoryData = {
			name: data.get("name"),
		};
		createCategory(catgoryData)
		
	  }


		async function createCategory(categoryData) {
		  try{
			const response = await All_API.createCategory(categoryData)
			if(response.data.status === "success") {
				ToastSuccess(response.data.message)
				onCreate()
				handleCancel()
			}else {
				ToastError(response.data.message)
				handleCancel()

			}
		  }catch {
			ToastError("please try again")
			handleCancel()
		  }
		}


  return (
    <div className="row">
						<div className="">
							<div className="ec-cat-list card card-default mb-24px">
								<div className="card-body">
									<div className="ec-cat-form">
										<h4>Add New Category</h4>

										<form className="row" onSubmit={handleSubmit}>
											<div className="form-group col-12 ">
												   <label htmlFor="text" className="col-form-label">Category name</label> 
													<input id="name" name="name" className="form-control-2 here slug-title" type="text" />
											</div>


											<div className="row">
												<div className="col-12">
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

export default CreateCategoryForm
