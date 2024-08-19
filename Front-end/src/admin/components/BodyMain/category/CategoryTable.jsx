import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCategory from "../../../pages/CategoryAdmin/AddCategory";
import UpdateCategory from "../../../pages/CategoryAdmin/UpdateCategory";
import All_API from "../../../../State/Auth/All_API";
import DeleteLayout from "../DeleteLayout/DeleteLayout";
import { ToastError, ToastSuccess } from "../notification/Notification";

const CategoryTable = () => {
  const [openAtion, setOpenAction] = useState(null);
  const navigate = useNavigate();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [categories, setCategories] = useState([])
  const [idObject, setIdObject] = useState('');
  const [loading, setLoading] = useState(false)



  async function getAllCategory() {
    try{
      const response = await All_API.getAllCategory()
       setCategories(response.data)
    }catch {
      
    }
  }


  
  async function deleteCategory(id) {
		try{
		  const response = await All_API.deleteCategory(id)
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
    getAllCategory()
  }, [loading])


  const handleLoading = ()=> {
    setLoading(!loading)
  }

  const handleAddOpen = () => {
    setOpenAddModal(true);
  };

  const handleAddClose = () => {
    setOpenAddModal(false);
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



  

  const handleAction = (id) => {
    if (openAtion === id) {
      setOpenAction(null);
    } else {
      setOpenAction(id);
    }
  };
  return (
    <Fragment>
      
		<div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
        <div>
          <h1>All Category</h1>
          <p className="breadcrumbs">
            <span onClick={() => navigate("/admin")}>
              <a>Home</a>
            </span>
            <span>
              <i className="mdi mdi-chevron-right"></i>
            </span>
            All Category
          </p>
        </div>
        <div>
          <a onClick={()=>handleAddOpen()} className="btn btn-primary btn-admin">
            Add Category
          </a>
        </div>
      </div>
	  <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="ec-cat-list card card-default">
            <div className="card-body">
              <div className="table-responsive">
                <table id="responsive-data-table" className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Category</th>
                      
                      <th >Action</th>
                      
                    </tr>
                  </thead>

                  <tbody>
                 {categories?.map((category)=> ( <tr key={category.id}>
                      <td>{category.id} </td>

                      <td>{category.name}</td>

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
                            onClick={() => handleAction(category.id)}
                            className="btn btn-menu-2 btn-outline-success btn-menu dropdown-toggle dropdown-toggle-split"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            data-display="static"
                          >
                            <span className="sr-only">Info</span>
                          </button>
                          {openAtion === category.id && (
                            <div className="dropdown-menu dropdown-menulist">
                              <a className="dropdown-item" onClick={()=> {
                                setIdObject(category.id)
                                handleUpdateOpen()
                                setOpenAction(null)
                              }}>
                                Edit
                              </a>
                              <a className="dropdown-item" onClick={()=>{
                                setIdObject(category.id)
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
	  {openAddModal && (
          <AddCategory open={openAddModal} handleClose={handleAddClose} onCreate={handleLoading} />
        )}

		{openUpdateModal && (
          <UpdateCategory open={openUpdateModal} handleClose={handleUpdateClose} idObject={idObject} onUpdate={handleLoading} />
        )}

{openDeleteModal && <DeleteLayout  open={openDeleteModal} handleClose={handleDeleteClose} idObject={idObject} deleteFunction={deleteCategory} />}


      
      
    </Fragment>
  );
};

export default CategoryTable;
