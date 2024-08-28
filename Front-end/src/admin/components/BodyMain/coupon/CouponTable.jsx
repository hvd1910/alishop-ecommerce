import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import All_API from "../../../../State/Auth/All_API";
import { Pagination, Stack } from "@mui/material";
import { ToastError, ToastSuccess } from "../notification/Notification";
import ViewContact from "../../../pages/ContactAdmin/ViewContact";
import DeleteLayout from "../DeleteLayout/DeleteLayout";
import AddCoupon from "../../../pages/CouponAdmin/AddCoupon";
import UpdateCoupon from "../../../pages/CouponAdmin/UpdateCoupon";
import ViewCoupon from "../../../pages/CouponAdmin/ViewCoupon";
import CouponCondition from "../../../pages/CouponConditionAdmin/CouponCondition";

const CouponTable = () => {
  const [openAtion, setOpenAction] = useState(null);
  const navigate = useNavigate();

  const [coupons, setCoupons] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [idObject, setIdObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(2);
  const [page, setPage] = useState(0);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openConditionModal, setOpenConditionModal] = useState(false);

  const timeoutRef = useRef(null);


  

  const handleLoading = ()=> {
	setLoading(!loading)
  }

  const handleAddOpen = () => {
    setOpenAddModal(true);
  };

  const handleAddClose = () => {
    setOpenAddModal(false);
  };

  const handleViewOpen = () => {
	setOpenViewModal(true);
  };

  const handleViewClose = () => {
	setOpenViewModal(false);
  };

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

  const handleConditionOpen = () => {
	setOpenConditionModal(true);
  };

  const handleConditionClose = () => {
	setOpenConditionModal(false);
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


async function deleteCoupon(id) {
	try{
	  const response = await All_API.deleteCoupon(id)
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

async function getAllContact(data) {
    try {
      const response = await All_API.getAllCoupon(data);
      setCoupons(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
    } catch {}
  }


  useEffect(() => {
    const data = {
      page: page || 0,
      limit: limit || 2,
      keyword: keyword || "",
    };
    getAllContact(data);
  }, [loading, keyword, limit, page]);

  return (
	<Fragment>
	<div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
	  <div>
		<h1>All Coupon</h1>
		<p className="breadcrumbs">
		  <span onClick={() => navigate("/admin")}>
			<a>Home</a>
		  </span>
		  <span>
			<i className="mdi mdi-chevron-right"></i>
		  </span>
		  All Coupon
		</p>
	  </div>
	  <div>
          <a onClick={()=>handleAddOpen()} className="btn btn-primary btn-admin">
            Add Coupon
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
							  <th>Code</th>
							  <th>Usage Limit</th>
							  <th>Status</th>
							  <th>Action</th>
						  </tr>
						 
					  </thead>

					  <tbody>
					  {coupons?.map((coupon) => (<tr  key={coupon.id}>
							  <td>{coupon.id}</td>
							  <td>{coupon.code}</td>
                              <td>{coupon.usageLimit}</td>
							  <td>{coupon.active === true ? <button className="badge badge-success btn-status" >Active</button>: <button className="badge badge-danger btn-status">Block</button>}</td>
							  <td>
					  <div className="btn-group">
						<button
						   onClick={()=> {
							setIdObject(coupon.id)
							handleViewOpen()
						   }}
						  type="button"
						  className=" btn btn-menu-2 btn-outline-success"
						>
						  Info
						</button>
						<button
						  type="button"
						  onClick={() => handleAction(coupon.id)}
						  className="btn btn-menu-2 btn-outline-success btn-menu dropdown-toggle dropdown-toggle-split"
						  data-bs-toggle="dropdown"
						  aria-haspopup="true"
						  aria-expanded="false"
						  data-display="static"
						>
						  <span className="sr-only">Info</span>
						</button>
						{openAtion === coupon.id && (
						  <div className="dropdown-menu dropdown-menulist">
							<a className="dropdown-item" onClick={()=> {
								setIdObject(coupon.id)
								handleConditionOpen()
								setOpenAction(null)
							}}>
							  Manage Conditions
							</a>
							<a className="dropdown-item" onClick={()=> {
								setIdObject(coupon.id)
								handleUpdateOpen()
								setOpenAction(null)
							}}>
							  Edit
							</a>
							<a className="dropdown-item" onClick={()=>{
							  setIdObject(coupon.id)
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
          <AddCoupon open={openAddModal} handleClose={handleAddClose} onCreate={handleLoading} />
        )}

	  {openViewModal && (
		<ViewCoupon open={openViewModal} handleClose={handleViewClose} idObject={idObject} />
	  )}
	  
	  

	  {openUpdateModal && (
          <UpdateCoupon open={openUpdateModal} handleClose={handleUpdateClose} idObject={idObject} onUpdate={handleLoading} />
        )}



	{openDeleteModal && <DeleteLayout  open={openDeleteModal} handleClose={handleDeleteClose} idObject={idObject} deleteFunction={deleteCoupon} onDelete={handleLoading}/>}


	{openConditionModal && (
          <CouponCondition open={openConditionModal} handleClose={handleConditionClose} couponId={idObject} />
        )}
  </Fragment>
  );
};

export default CouponTable;
