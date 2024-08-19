import React, { Fragment, useEffect, useState } from "react";
import avatar from "../../../assets/images/avatar-1.jpg";
import cart from "../../../assets/images/icons/cart.png";
import doller from "../../../assets/images/icons/doller.png";
import { useSelector } from "react-redux";
import { GetUser } from "../../../State/Auth/authCustomerSlice";
import All_API from "../../../State/Auth/All_API";
import { ToastError, ToastSuccess } from "../../../admin/components/BodyMain/notification/Notification";
import { ConvertDate, convertDateFormat, formatDatePut } from "../../../admin/components/BodyMain/Convert/Convert";
import InputLayout from "../../../admin/components/Input/InputLayout";
import {  useNavigate } from "react-router-dom";




const ProfileDetail = () => {
  const navigate = useNavigate()
  const user = useSelector(GetUser);
  const [openTabContent, setOpenTabContent] = useState(1);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

 

  const handleTabContent = (index) => {
    setOpenTabContent(index);
  };

  const onLoad = () => {
    setLoading(!loading);
    
  };

  const handleDelete = (id, status) => {
    if (status !== 0) {
      async function updateOrderStatus(id, status) {
        try {
          const response = await All_API.updateOrderStatus(id, status);
          console.log(response.data)
          if (response.data.status === "success") {
            ToastSuccess(response.data.message);
            onLoad();
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



  const handleSubmit = (event)=> {
		event.preventDefault();
	
		const data = new FormData(event.currentTarget);
		const userData = {
			fullname: data.get("fullname"),
      phone_number: user?.phone_number,
      address: data.get("address"),
      date_of_birth: formatDatePut(data.get("date_of_birth")),
      password: data.get("password"),
      retype_password: data.get("retype_password")
		};
		 if(userData.password === userData.retype_password) {
      updateUser(user.id, userData)
     }else{
      ToastError("Passwords do not match.")
     }
		
	  }

	  async function updateUser(id, userData) {
		try{
		  const response = await All_API.updateUser(id, userData)
    
		  if(response.data.status === "success") {
			  ToastSuccess("Updated account information successfully.")
        setTimeout(() => {
          window.location.reload();
        }, 2500);
		  }else {
			  ToastError(response.data.message)
		  }
		}catch (error){
      ToastError(error.response.data.message);

		}
	  }

  useEffect(() => {
   
    if (user) {
      getOrderByUserId(user.id);
      
    }
    
    async function getOrderByUserId(userId) {
      try {
        const response = await All_API.getOrderByUserId(userId);
        if (response.data.status === "success") {
          setOrders(response.data.data);
        } else {
          ToastError(response.data.message);
        }
      } catch (error) {
        ToastError(error.response.data.message);
      }
    }
  }, [user, loading]);
  return (
    <div className="sm:px-6 lg:px-20 ml-16 mr-16">
      <div className="user_profile_wrapper_top card mt-6 ">
        <div className="user_profile_top_bg"></div>
        <div className="user_profile_top_des">
          <div className="user_profile_img max-w-[140px] max-h-[140px] ">
            <img src={avatar} alt="" />
          </div>
          <div className="user_profile_text_top">
            <h3>{user?.fullname}</h3>
            <p>{user?.address}</p>
          </div>
        </div>
      </div>
      <div className="card bg-white profile-content ">
        <div className="row">
          <div className="col-lg-4 col-xl-3">
            <div className="profile-content-left profile-left-spacing">
              <div className="product_card_bottom_wrapper">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card_bottom_items">
                      <div className="card_bottom_item_icon">
                        <img src={cart} alt="" />
                      </div>
                      <div className="card_bottom_item_text">
                        <p>Orders</p>
                        <h3>{orders.length}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="card_bottom_items">
                      <div className="card_bottom_item_icon">
                        <img src={doller} alt="" />
                      </div>
                      <div className="card_bottom_item_text">
                        <p>Amount</p>
                        <h3>
                          $
                          {orders
                            .reduce((sum, item) => sum + item.totalMoney, 0)
                            .toFixed(1)}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="w-100" />

              <div className="contact-info pt-4">
                <h5 className="text-dark">Contact Information</h5>
                <div className="contact_info_sidebar_item">
                  <h3>Address</h3>
                  <p>{user?.address}</p>
                </div>

                <div className="contact_info_sidebar_item">
                  <h3>Email</h3>
                  <p>{user?.email}</p>
                </div>
                <div className="contact_info_sidebar_item">
                  <h3>Phone number</h3>
                  <p>{user?.phone_number}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-xl-9">
            <div className="profile-content-right profile-right-spacing py-5">
              <ul
                className="nav nav-tabs px-3 px-xl-5 nav-style-border"
                id="myProfileTab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => handleTabContent(1)}
                    className={`nav-link ${
                      openTabContent === 1 ? "active" : ""
                    }`}
                    id="orders-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#r-orders"
                    type="button"
                    role="tab"
                    aria-controls="orders"
                    aria-selected="false"
                  >
                    Recent orders
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => handleTabContent(2)}
                    className={`nav-link ${
                      openTabContent === 2 ? "active" : ""
                    }`}
                    id="settings-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#settings"
                    type="button"
                    role="tab"
                    aria-controls="settings"
                    aria-selected="false"
                  >
                    Settings
                  </button>
                </li>
              </ul>
              <div className="tab-content px-3 px-xl-5" id="myTabContent">
                <div
                  className={`tab-pane fade  ${
                    openTabContent === 1 ? "show active" : ""
                  }`}
                  id="r-orders"
                  role="tabpanel"
                  aria-labelledby="orders-tab"
                >
                  <div className="tab-widget mt-5">
                    <div className="user_profile_top_heading">
                      <h3>Recent orders</h3>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="card card-default">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table
                                id="responsive-data-table"
                                className="table"
                                style={{ width: "100%" }}
                              >
                                <thead>
                                  <tr>
                                    <th>ID</th>
                                    <th>Product name</th>
                                    <th>Price</th>
                                    <th>Order date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {orders.map((order) => (
                                    <tr key={order?.id}>
                                      <td>#{order?.id}</td>
                                      <td className="truncate whitespace-nowrap overflow-hidden max-w-[120px] ">
                                        {order?.orderDetails.map(
                                          (orderDetail, index) => (
                                            <span
                                              key={
                                                orderDetail.product.name + index
                                              }
                                            >
                                              {orderDetail.product.name} x{" "}
                                              {orderDetail.numberOfProducts}
                                              {index <
                                              order.orderDetails.length - 1
                                                ? ", "
                                                : ""}
                                            </span>
                                          )
                                        )}
                                      </td>
                                      <td>${order?.totalMoney}</td>
                                      <td>{ConvertDate(order?.orderDate)}</td>
                                      <td>{order?.status.toUpperCase()}</td>
                                      <td>
                                        <button
                                          className={`badge btn-status px-4 py-2 rounded
                    						${
                      						order.status === "pending"
                        						? "bg-red-500 hover:bg-red-400"
                        						: "bg-red-800 cursor-not-allowed"
                    						}`}
                                          disabled={order.status !== "pending"}
										  onClick={()=> {
											handleDelete(order?.id, 'cancelled')}}
                                        >
                                          Rejected
                                        </button>
                                        <button
                                onClick={() =>
                                  navigate(`/account/orders/${order.id}`)
                                }
                                type="button"
                                className=" btn btn-menu-2 btn-outline-info ml-3 btn-order-detail"
                              >
                                Detail
                              </button>
                                      </td>
                                      <td></td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`tab-pane fade  ${
                    openTabContent === 2 ? "show active" : ""
                  }`}
                  id="settings"
                  role="tabpanel"
                  aria-labelledby="settings-tab"
                >
                  <div className="tab-widget mt-5">
                    <div className="user_profile_top_heading">
                      <h3>Customer settings</h3>
                    </div>
                    <div className="tab-pane-content mt-5">
                      <form onSubmit={handleSubmit}>
                        <div className="row mb-2">
                          <div className="col-lg-6">
                            <div className="form-group input-profile input-profile">
                            <label htmlFor="fullname" className="col-form-label">Full Name</label> 
                            <InputLayout className="" name="fullname"  type="text" value={user?.fullname}/>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="form-group input-profile">
                              <label htmlFor="phone_number">Phone</label>
                              <input type="text" className="form-control-2" id="phone_number"
                                       name="phone_number" value={user?.phone_number} disabled/>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="form-group input-profile mb-4">
                              <label htmlFor="email">Email</label>
                              <InputLayout name="email"  type="email" value={user?.email}/>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group input-profile mb-4">
                              <label htmlFor="date_of_birth">Birthday</label>
                              <InputLayout name="date_of_birth"  type="date" value={convertDateFormat(user?.date_of_birth)}/>
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="form-group input-profile mb-4">
                              <label htmlFor="address">Address</label>
                              <InputLayout name="address"  type="text" value={user?.address}/>
                            </div>
                          </div>
                         
                          <div className="col-lg-6">
                            <div className="form-group input-profile mb-4">
                              <label htmlFor="password">New password</label>
                              <input
                                type="password"
                                className="form-control-2"
                                id="password"
                                name="password"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group input-profile mb-4">
                              <label htmlFor="retype_password">Confirm password</label>
                              <input
                                type="password"
                                className="form-control-2"
                                id="retype_password"
                                name="retype_password"
                              />
                            </div>
                          </div>
                     
                        </div>

                        <div className="d-flex justify-content-end mt-5">
                          <button
                            type="submit"
                            className="btn btn-primary mb-2 btn-pill"
                          >
                            Update Profile
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
