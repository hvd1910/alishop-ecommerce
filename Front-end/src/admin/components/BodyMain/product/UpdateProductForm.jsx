import React, { Fragment, useEffect, useState } from 'react'
import All_API from '../../../../State/Auth/All_API'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastError, ToastSuccess } from '../notification/Notification'
import InputLayout from '../../Input/InputLayout'
import TextAreaLayout from '../../Input/TextAreaLayout'
import ImageProduct from './ImageProduct'
import SizeProductLayout from './SizeProductLayout'
import SelectValueIdLayout from '../../Input/SelectValueIdLayout'
import SelectActiveLayout from '../../Input/SelectActiveLayout'


const UpdateProductForm = () => {
	const jwtAdmin = localStorage.getItem("jwtAdmin")

    const { productId } = useParams();
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [product, setProduct] = useState()
	const [isLoad, setIsLoad] = useState(false)
	

	const onLoad = () => {
		setIsLoad(!isLoad)
	}


    async function getProductById(productId) {
		try{
		  const response = await All_API.getProductById(productId)
          if(response.data.status === "success") {
            setProduct(response.data.data)
          }else {
            ToastError(response.data.status)
            navigate("/admin/products")
          }
		}catch {
			ToastError("please try again")
			navigate("/admin/products")
		}
	  }
	
	
	  const handleSubmit = (event) => {
		event.preventDefault();
	
		const data = new FormData(event.currentTarget);
		const productData = {
			name: data.get("name"),
			category_id: data.get("category_id"),
			price: data.get("price"),
			discount: data.get("discount"),
			description: data.get("description"),
			active: data.get("active") === "true",

		};

		updateProduct(productId, productData)
	  }


	  async function updateProduct(id, catgoryData) {
		try{
		  const response = await All_API.updateProduct(id, catgoryData)
		  if(response.data.status === "success") {
			  ToastSuccess(response.data.message)

		  }else {
			  ToastError(response.data.message)
		  }
		}catch (error){
			ToastError(error.response.data.message)
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
        getProductById(productId)
      }, [isLoad])
  return (
    <Fragment>
        	<div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
						<div>
							<h1>Edit Product</h1>
							<p className="breadcrumbs"><span><a onClick={()=> navigate('/admin')}>Home</a></span>
								<span><i className="mdi mdi-chevron-right"></i></span>Product</p>
						</div>
						<div>
							<a  className="btn btn-primary" onClick={()=> navigate(`/admin/products`)}> View List Product 
							</a>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<div className="card card-default">
								<div className="card-header card-header-border-bottom">
									<h2>Edit Product</h2>
								</div>

								<div className="card-body">
									<div className="row ec-vendor-uploads">
										<div className="col-lg-8">
											<div className="ec-vendor-upload-detail">
												<form className="row g-3" onSubmit={handleSubmit}>
													<div className="col-md-6">
														<label htmlFor="inputEmail4" className="form-label">Product name</label>
														<InputLayout type="text" value={product?.name} name="name"/>
													</div>
													<div className="col-md-6">
                                                        <SelectValueIdLayout nameObject="category_id" label="Category" initialValue={product?.category_id} getData={categories}/>

													</div>
													
													
													<div className="col-md-6">
														<label htmlFor="inputEmail9" className="form-label">Price</label>
														<InputLayout type="number" value={product?.price} name="price"/>
													</div>
													<div className="col-md-6">
														<label htmlFor="inputEmail0" className="form-label">Discount (%)</label>
														<InputLayout type="number" value={product?.discount} name="discount"/>
													</div>

										

													
													<div className="col-md-12">
														<label className="form-label">Description</label>
                                                        <TextAreaLayout name="description" value={product?.description}/>
													</div>

													<div className="col-md-12">
														<SelectActiveLayout nameObject="active" label="Active"  initialValue={product?.active}/>
														</div>
													<div className="col-md-12">
														<div className="product_add_cancel_button">
															<button onClick={()=> navigate("/admin/products")} className="btn btn-border">Cancel</button>
															<button type="submit" className="btn btn-primary">Update product</button>
														</div>
														
													</div>
												</form>
											</div>

											<SizeProductLayout productDetails={product?.product_details} onLoad={onLoad}/>
										</div>
									<ImageProduct idProduct={productId} imageData={product?.product_images} token={jwtAdmin}  onLoad={onLoad}/>
									</div>
								</div>
							</div>
						</div>
					</div>
    </Fragment>
  )
}

export default UpdateProductForm
