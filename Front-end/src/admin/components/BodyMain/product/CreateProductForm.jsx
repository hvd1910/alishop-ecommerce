import React, { useEffect, useState } from 'react'
import EditIcon from '../../../../assets/images/icons/edit.svg'
import All_API from '../../../../State/Auth/All_API';
import { ToastError, ToastSuccess } from '../notification/Notification';
import SelectValueIdLayout from '../../Input/SelectValueIdLayout';


const CreateProductForm = ({handleCancel, onCreate}) => {
    const [categories, setCategories] = useState([])



    
    const handleSubmit = (event) => {
		event.preventDefault();
	
		const data = new FormData(event.currentTarget);
		const categoryData = {
			name: data.get("name"),
            category_id: data.get("category_id"),
            price: data.get("price"),
            thumbnail: "",
            description: data.get("description"),
		};
		createProduct(categoryData)
	  }

    

		async function createProduct(productData) {
		  try{
			const response = await All_API.createProduct(productData)
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



  async function getAllCategory() {
    try{
      const response = await All_API.getAllCategory()
      setCategories(response.data)
        }catch {
      
    }
  }

  useEffect(()=> {
    getAllCategory()
    
  }, [])
 
  return (
    
    <div className="col-lg-12 mt-6">
      <div className="ec-cat-list card card-default mb-24px">
		<div className="card-body">
        <div className="ec-cat-form">
										<h4>Add New Product</h4>

        <div className="ec-vendor-upload-detail">
        <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6 mt-3">
                <label htmlFor="inputEmail4" className="form-label">Product name</label>
                <input type="text" className="form-control slug-title" placeholder="Casual men shirt" id="name" name='name'/>
            </div>
            <div className="col-md-6 mt-3">
               <SelectValueIdLayout nameObject="category_id" label="Category"  getData={categories}/>
            </div>
           
           
            <div className="col-md-6 mt-3">
                <label htmlFor="price" className="form-label">Product price</label>
                <input type="number" className="form-control " placeholder="Product price" id="price" name='price' min={0}/>
            </div>
        
            <div className="col-md-6 mt-3">
                <label htmlFor="discount" className="form-label">Discount (%)</label>
                <input type="number" className="form-control " placeholder="Product discount" id="discount" name='discount' max={100} min={0}/>
            </div>
           
            <div className="col-md-12 mt-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows="4" name='description'></textarea>
            </div>
            <div className="col-md-12 mt-5">
                <div className="product_add_cancel_button">
                    <button onClick={()=>handleCancel()} className="btn btn-border">Cancel</button>
                    <button type="submit" className="btn btn-primary">Add product</button>
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

export default CreateProductForm
