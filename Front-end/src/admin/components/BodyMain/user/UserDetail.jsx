import React, { Fragment, useEffect, useState } from "react";
import avatar from "../../../../assets/images/avatar-1.jpg";
import shopping from "../../../../assets/images/icons/shoping.png";
import cart from "../../../../assets/images/icons/cart.png";
import doller from "../../../../assets/images/icons/doller.png";
import chart from "../../../../assets/images/icons/chart.png";
import { ToastError } from "../notification/Notification";
import All_API from "../../../../State/Auth/All_API";
import { convertDateFormat } from "../Convert/Convert";

const UserDetail = ({ idObject, handleCancel }) => {
  const [user, setUser] = useState();

  async function getUserById() {
    try {
      const response = await All_API.getUserById(idObject);
      setUser(response.data.data);
    } catch {
      ToastError("Please try again");
      handleCancel();
    }
  }

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <div className="tab-widget mt-10 bg-white rounded-2xl">
      <div
        className="user_profile_top_heading pl-4 pr-4 pt-2 "
        style={{ marginBottom: "10px" }}
      >
        <h3 className="pt-2">Update User </h3>
      </div>
      <div className="tab-pane-content  pl-4 pr-4">
        <form>
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
                  name="fullname"
                  value={user?.fullname}
                  disabled
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
                  value={user?.phone_number}
                  disabled
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="form-group input-profile mb-1">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control-2"
                  name="email"
                  id="email"
                  value={user?.email}
                  disabled
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
                  value={convertDateFormat(user?.date_of_birth)}
                  disabled
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
                  value={user?.address}
                  disabled
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="form-group input-profile mb-1">
                <label htmlFor="role_id">Role</label>
                <input
                  type="text"
                  className="form-control-2"
                  id="role_id"
                  name="role_id"
                  value={user?.role.name.toUpperCase()}
                  disabled
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="form-group input-profile mb-1">
                <label htmlFor="active">Active</label>
                <input
                  type="text"
                  className="form-control-2"
                  id="active"
                  name="active"
                  value={user?.is_active.toString().toUpperCase()}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-5 pb-3">
            <button
              onClick={() => handleCancel()}
              type="button"
              className="btn btn-primary mb-2 btn-pill"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetail;
