import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import All_API from '../../../../State/Auth/All_API';
import { ToastError, ToastSuccess } from '../notification/Notification';
import UpdateProductDetail from './UpdateProductDetail';
import DeleteLayout from '../DeleteLayout/DeleteLayout';
import { API_BASE_URL } from '../../../../config/apiConfig';

const SizeProductLayout = ({productDetails, onLoad}) => {
  const { productId } = useParams();
  const [idObject, setIdObject] = useState('');
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAtion, setOpenAction] = useState(null);


    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const productDetailData = {
              color: data.get("color"),
              size: data.get("size"),
              qty: data.get("qty")
      };
      createProductDetail(productId, productDetailData)
    } 




    async function createProductDetail(productId, productData) {
		  try{
			const response = await All_API.createProductDetail(productId,productData)
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


    async function deleteProductDetail(id) {
      try{
        const response = await All_API.deleteProductDetail(id)
        if(response.data.status === "success") {
          ToastSuccess(response.data.message)
          onLoad()
          handleDeleteClose()
        }else {
          ToastError(response.data.message)
          handleDeleteClose()
        }
      }catch (error){
        ToastError(error.response.data.message)
      }
      }

   
    
      const handleUpdateOpen = () => {
        setOpenUpdateModal(true);
        
      };
    
      const handleUpdateClose = () => {
        setOpenUpdateModal(false);
      };
    
      const handleDeleteOpen = () => {
        setOpenDeleteModal(true);
      };
    
      const handleDeleteClose = () => {
        setOpenDeleteModal(false);
      };
    
      const handleAction = (id) => {
        if (openAtion === id) {
          setOpenAction(null);
        } else {
          setOpenAction(id);
        }
      };

     const onUpdate = ()=> {
      onLoad()
     }
     

  return (
    <Fragment>
        <div className='table-size mt-8'>
        <form className="row g-3 " onSubmit={handleSubmit}>
        <div className="col-md-4 mt-5">
                <label htmlFor="size" className="form-label">COLOR</label>
                <input type="text" className="form-control " placeholder="Color" id="color" name='color'/>
            </div>
            <div className="col-md-4 mt-5">
                <label htmlFor="size" className="form-label">SIZE</label>
                <input type="text" className="form-control " placeholder="Size" id="size" name='size'/>
            </div>
            <div className="col-md-4 mt-5">
                <label htmlFor="qty" className="form-label">Quantity</label>
                <input type="number" className="form-control " placeholder="0" id="qty" name='qty' min={0}/>
            </div>
            <div className="col-md-12 mt-5">
                <div className="product_add_cancel_button">
                    <button type="submit" className="btn btn-primary">Add Size & Color</button>
                </div>
                
            </div>
    

        </form>
        </div>
        <div className="row mt-6 ">
            <div className="col-xl-12 col-lg-12 ">
              <div className="ec-cat-list ">
                <div className="card-body table-size">
                  <div className="table-responsive">
                    <table id="responsive-data-table" className="table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Size</th>
                          <th>Color</th>
                          <th >Quantity</th>
                          <th >Action</th>
        
                        </tr>
                      </thead>
                      <tbody>
                     {productDetails?.map((productDetail)=> ( <tr key={productDetail.id}>
                          <td>{productDetail.id} </td>
                          <td>{productDetail.size}</td>
                          <td>{productDetail.color}</td>
                          <td>{productDetail.qty}</td>
                          <td>
                            <div className="btn-group">
                              <button
                                type="button"
                                className=" btn btn-menu-2 btn-outline-success"
                              >
                                Info
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAction(productDetail.id)}
                                className="btn btn-menu-2 btn-outline-success btn-menu dropdown-toggle dropdown-toggle-split"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                data-display="static"
                              >
                                <span className="sr-only">Info</span>
                              </button>
                              {openAtion === productDetail.id && (
                                <div className="dropdown-menu dropdown-menulist">
                                  <a className="dropdown-item" onClick={()=> {
                                    setIdObject(productDetail.id)
                                    handleUpdateOpen()
                                    setOpenAction(null)
                                    }}>
                                    Edit
                                  </a>
                                  <a className="dropdown-item" onClick={()=>{
                                    setIdObject(productDetail.id)
                                    handleDeleteOpen()
                                    setOpenAction(null)
                                    }}>
                                    Delete
                                  </a>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
        
          </div>
          
        
         <UpdateProductDetail open={openUpdateModal} handleClose={handleUpdateClose} idObject={idObject} onUpdate={onUpdate}/>
        
        {openDeleteModal && <DeleteLayout  open={openDeleteModal} handleClose={handleDeleteClose} idObject={idObject} deleteFunction={deleteProductDetail}  />} 
    </Fragment>

  )
}

export default SizeProductLayout
