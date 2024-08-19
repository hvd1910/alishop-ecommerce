import React, { useState } from "react";
import { ToastError, ToastSuccess } from "../notification/Notification";
import All_API from "../../../../State/Auth/All_API";
import { formatDatePut } from "../Convert/Convert";

const CreateUserForm = ({handleCancel, onCreate}) => {


    const handleSubmit = (event) => {
    
        event.preventDefault()
    
        const data = new FormData((event.currentTarget))
        const userData = {
            fullname: data.get("fullname"),
            phone_number: data.get("phone_number"),
            email: data.get("email"),
            password: data.get("password"),
            retype_password: data.get("retype_password"),
            date_of_birth: formatDatePut(data.get("date_of_birth")),
            facebook_account_id: 0,
            google_account_id: 0,
            role_id: 1
        }
        if(userData.password === userData.retype_password) {
            register(userData)
           }else{
            ToastError("Passwords do not match.")
           }
              
    
        async function register(userData) {
          try{
            const data = await All_API.registerAPI(userData)
              if(data.data.status==="success") {
                  ToastSuccess("Add user successfully.")
                  onCreate()
				  handleCancel()
              }
              else {
                ToastError(data.data.status);
                handleCancel()
              }
          }catch (error) {
            ToastError(error.response.data.message);
            handleCancel()
          }
        }
    }
  return (
    <div className="tab-widget mt-10 bg-white rounded-2xl">
      <div className="user_profile_top_heading pl-4 pr-4 pt-2 " style={{marginBottom:"10px"}}>
        <h3 className="pt-2">Add New User</h3>
      </div>
      <div className="tab-pane-content  pl-4 pr-4" >
        <form onSubmit={handleSubmit}>
          <div className="row mb-1">
            <div className="col-lg-6">
              <div className="form-group input-profile input-profile">
                <label htmlFor="fullname" className="col-form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control-2"
                  id="fullname"
                  placeholder="Nguyen Van A"
                  required
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="form-group input-profile">
                <label htmlFor="phone_number">Phone</label>
                <input
                  type="text"
                  className="form-control-2"
                  id="phone_number"
                  name="phone_number"
                  placeholder="0123456789"
                  required
                    maxLength={10}

                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="form-group input-profile mb-1">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control-2"
                  id="email"
                  name="email"
                  placeholder="email@gmail.com"
                  required

                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group input-profile mb-1">
                <label htmlFor="date_of_birth">Birthday</label>
                <input
                  type="date"
                  className="form-control-2"
                  id="date_of_birth"
                  name="date_of_birth"
                  required

                />
              </div>
            </div>

            <div className="col-lg-12">
              <div className="form-group input-profile mb-1">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control-2"
                  id="address"
                  name="address"
                  placeholder="House number, street, district, province, country. "
                  required

                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="form-group input-profile mb-1">
                <label htmlFor="password">New password</label>
                <input
                  type="password"
                  className="form-control-2"
                  id="password"
                  name="password"
                  required

                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group input-profile mb-1">
                <label htmlFor="retype_password">Confirm password</label>
                <input
                  type="password"
                  className="form-control-2"
                  id="retype_password"
                  name="retype_password"
                  required

                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-5 pb-3">
            <button type="submit" className="btn btn-primary mb-2 btn-pill">
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
