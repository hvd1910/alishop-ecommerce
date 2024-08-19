import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import All_API from '../../../../State/Auth/All_API';
import { Pagination, Stack } from '@mui/material';
import StatusButton from './StatusButton';
import { ToastError, ToastSuccess } from '../notification/Notification';
import UpdateOrder from '../../../pages/OrderAdmin/UpdateOrder';

const OrderTableReject = () => {
 
  
    const [openAtion, setOpenAction] = useState(null);
    const navigate = useNavigate();
  
    const [orders, setOrders] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(false);
    const [idObject, setIdObject] = useState('');
    const [keyword, setKeyword] = useState('');
    const [limit, setLimit] = useState(2);
    const [page, setPage] = useState(0)
    const timeoutRef = useRef(null);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    

    async function getAllOrders(data) {
        try{
          const response = await All_API.getAllOrders(data)
          setOrders(response.data.data.orders)
          setTotalPages(response.data.data.totalPages)


        }catch {
          
        }
      }

      const onLoad = () => {
        setLoading(!loading);
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
      setPage(Number(e.target.value));
    };

    const handlePaginate =  (event, value) => {
      setPage(value -1); // Cập nhật số trang hiện tại khi người dùng chuyển trang
    };
    

    const handleUpdateOpen = () => {
      setOpenUpdateModal(true);
    };
  
    const handleUpdateClose = () => {
      setOpenUpdateModal(false);
    };
  
    const handleDelete = (id, status) => {
      if (status !== 0) {
        async function updateOrderStatus(id, status) {
          try {
            const response = await All_API.updateOrderStatus(id, status);
            console.log(response.data)
            if (response.data.status === "success") {
              ToastSuccess(response.data.message);
              onLoad()
            } else {
              ToastError(response.data.message);
            }
          } catch (error) {
            ToastError(error.response.data.message);
          }
        }
        updateOrderStatus(id, status);
      }
    };
  



    useEffect(()=> {
      const data = {
        page: page || 0,
        limit:limit || 2,
        status: "cancelled",
        keyword:keyword || ''
      }
      getAllOrders(data)
    }, [keyword, limit, page, loading])

      
  return (

    <Fragment>
      <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
        <div>
          <h1>All Order Rejected</h1>
          <p className="breadcrumbs">
            <span onClick={() => navigate("/admin")}>
              <a>Home</a>
            </span>
            <span>
              <i className="mdi mdi-chevron-right"></i>
            </span>
            All Order Rejected
          </p>
        </div>
        
      </div>
      
    <div className="row">
    <div className="col-12">
    
        <div className="card card-default mt-3">
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
                                <th>Full Name</th>
                                <th>Adress</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Payment Method</th>
                                <th>Transaction Number</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                           
                        </thead>

                        <tbody>
                        {orders?.map((order) => (<tr  key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.fullname}</td>
                                <td>{order.address}</td>
                                <td>{order.email}</td>
                                <td>{order.phone_number}</td>
                                <td>{order.payment_method}</td>
                                <td>{order.transaction_number}</td>
                                
                                <td>
                                <span class="badge badge-danger btn-status">Rejected</span>
                                </td>
                                <td>
                        <div className="btn-group">
                          <button
                             onClick={()=> navigate(`/admin/orders/${order.id}`)}
                            type="button"
                            className=" btn btn-menu-2 btn-outline-success"
                          >
                            Info
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAction(order.id)}
                            className="btn btn-menu-2 btn-outline-success btn-menu dropdown-toggle dropdown-toggle-split"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            data-display="static"
                          >
                            <span className="sr-only">Info</span>
                          </button>
                          {openAtion === order.id && (
                            <div className="dropdown-menu dropdown-menulist">
                               <a
                                    className="dropdown-item"
                                    onClick={() => {
                                      handleUpdateOpen();
                                      setIdObject(order?.id);
                                      setOpenAction(null) 
                                    }}
                                  > 
                                    Edit
                                  </a>
                                  {/* <a className="dropdown-item" onClick={()=> {
                                    handleDelete(order?.id, 'cancelled')
                                  }}>Delete</a> */}
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


<UpdateOrder
        open={openUpdateModal}
        handleClose={handleUpdateClose}
        onLoad={onLoad}
        idObject={idObject}
      />

    </Fragment>
  )
}

export default OrderTableReject
