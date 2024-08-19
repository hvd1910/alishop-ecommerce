import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import All_API from '../../../../State/Auth/All_API';
import AddProduct from '../../../pages/ProductAdmin/AddProduct';
import { API_BASE_URL } from '../../../../config/apiConfig';
import { Pagination, Stack } from '@mui/material';
import DeleteLayout from '../DeleteLayout/DeleteLayout';
import { ToastError, ToastSuccess } from '../notification/Notification';

const ProductTable = () => {
    const [openAtion, setOpenAction] = useState(null);
    const navigate = useNavigate();
  
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [products, setProducts] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [idObject, setIdObject] = useState('');
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [limit, setLimit] = useState(8);
    const [page, setPage] = useState(0)
    const timeoutRef = useRef(null);



    async function getAllProducts(data) {
        try{
          const response = await All_API.getAllProductsAdmin(data)
          setProducts(response.data.data.products)
          setTotalPages(response.data.data.totalPages)


        }catch {
          
        }
      }



     

    const handleLoading = ()=> {
        setLoading(!loading)
      }
    
      const handleAddOpen = () => {
        setOpenAddModal(true);
      };
    
      const handleAddClose = () => {
        setOpenAddModal(false);
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

      const handleInputChange = (e) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
    
        // Set a new timeout
        timeoutRef.current = setTimeout(() => {
          setKeyword(e.target.value);
        }, 500);
    }

    const handleSelectChange = (e) => {
      setLimit(Number(e.target.value));
    };

    const handlePaginate =  (event, value) => {
      setPage(value -1); // Cập nhật số trang hiện tại khi người dùng chuyển trang
    };

    async function deleteProduct(id) {
      try{
        const response = await All_API.deleteProduct(id)
        if(response.data.status === "success") {
          ToastSuccess(response.data.message)
          handleLoading()
          handleDeleteClose()
        }else {
          ToastError(response.data.message)
          handleDeleteClose()
        }
      }catch (error) {
        ToastError(error.response.data.message);
        handleDeleteClose()

      }
      }
    
    
    useEffect(()=> {
      const data = {
        categoryId: '',
        sort:"price_low",
        page: page,
        limit:limit,
        keyword:keyword
      }
      
      getAllProducts(data)
    }, [loading, keyword,limit,page])

      
  return (

    <Fragment>
      <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
        <div>
          <h1>All Product</h1>
          <p className="breadcrumbs">
            <span onClick={() => navigate("/admin")}>
              <a>Home</a>
            </span>
            <span>
              <i className="mdi mdi-chevron-right"></i>
            </span>
            All Product
          </p>
        </div>
        <div>
          <a onClick={()=>handleAddOpen()} className="btn btn-primary btn-admin">
            Add Product
          </a>
        </div>
      </div>
    <div className="row">
    <div className="col-12">
        <div className="card card-default">
            <div className="card-body">
                <div className="table-responsive">
                <div id="responsive-data-table_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                    <div className="row justify-content-between top-information">
                  <div className="dataTables_length" id="responsive-data-table_length">
                    <label>Show <select onChange={handleSelectChange}
                    value={limit}
                     name="responsive-data-table_length" 
                    aria-controls="responsive-data-table" className="form-select form-select-sm">
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      </select> entries</label></div>
                      <div id="responsive-data-table_filter" className="dataTables_filter">
                        <label>Search:<input type="search" onChange={handleInputChange} className="form-control form-control-sm" 
                        placeholder="" aria-controls="responsive-data-table"/>
                          </label>
                          </div>
                    </div>
                    <table id="responsive-data-table" className="table"
                        style={{width:"100%"}}>
                        <thead>
                        <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Product name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Total sales</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                           
                        </thead>

                        <tbody>
                        {products?.map((product) => (<tr  key={product.id}>
                                <td>{product.id}</td>
                                <td><img className="tbl-thumb" src={`${API_BASE_URL}products/images/${product.product_images[0]?.image_url}`} alt="Product Image" /></td>
                                <td>{product.name}</td>
                                <td>{product.category_id}</td>
                                <td>{product.price}</td>
                                <td>{product.total_sales}</td>
                                <td>{product.stock}</td>
                                <td>{product.active === true ? <button className="badge badge-success btn-status">Active</button>: <button className="badge badge-danger btn-status">Locked</button>}</td>
                                <td>
                        <div className="btn-group">
                          <button
                             onClick={()=> navigate(`/admin/products/${product.id}`)}
                            type="button"
                            className=" btn btn-menu-2 btn-outline-success"
                          >
                            Info
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAction(product.id)}
                            className="btn btn-menu-2 btn-outline-success btn-menu dropdown-toggle dropdown-toggle-split"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            data-display="static"
                          >
                            <span className="sr-only">Info</span>
                          </button>
                          {openAtion === product.id && (
                            <div className="dropdown-menu dropdown-menulist">
                              <a className="dropdown-item" onClick={()=> {
                                navigate(`/admin/products/edit/${product.id}`)
                                }}>
                                Edit
                              </a>
                              <a className="dropdown-item" onClick={()=>{
                                setIdObject(product.id)
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
                    <div>
                    <Stack spacing={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                      <Pagination count={totalPages} page={page+1} onChange={handlePaginate}  />
                    </Stack>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{openAddModal && (
          <AddProduct open={openAddModal} handleClose={handleAddClose} onCreate={handleLoading} />
        )}

		

{openDeleteModal && <DeleteLayout  open={openDeleteModal} handleClose={handleDeleteClose} idObject={idObject} deleteFunction={deleteProduct} onDelete={handleLoading}/>}

    </Fragment>
  )
}

export default ProductTable
