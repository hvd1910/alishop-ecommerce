import React, { Fragment, useEffect, useState } from "react";
import All_API from "../../../../State/Auth/All_API";
import { useNavigate, useParams } from "react-router-dom";
import { ToastError } from "../notification/Notification";
import { ConvertDate, formatNumber } from "../Convert/Convert";
import { API_BASE_URL } from "../../../../config/apiConfig";
import UpdateOrder from "../../../pages/OrderAdmin/UpdateOrder";

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);

  async function getOrderById(orderId) {
    try {
      const response = await All_API.getOrderDetail(orderId);
      if (response.data.status === "success") {
        setOrder(response.data.data);
      } else {
        ToastError(response.data.status);
        navigate("/admin/orders");
      }
    } catch (error) {
      ToastError(error.response.data.message);
      navigate("/admin/orders");
    }
  }

  const handleUpdateOpen = () => {
    setOpenUpdateModal(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdateModal(false);
  };

  const onLoad = () => {
    setLoading(!loading);
  };

  useEffect(() => {
    getOrderById(orderId);
  }, [loading]);

  return (
    <Fragment>
      <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
        <div>
          <h1>Order details</h1>
          <p className="breadcrumbs">
            <span>
              <a href="index.html">Home</a>
            </span>
            <span>
              <i className="mdi mdi-chevron-right"></i>
            </span>
            Order details
          </p>
        </div>

        <div>
          <a
            onClick={() => navigate(`/admin/orders`)}
            className="btn btn-primary mr-2"
          >
            View List Orders
          </a>
          {order?.status !== "cancelled" && (
            <a
              className="btn btn-primary btn-admin"
              onClick={() => handleUpdateOpen()}
            >
              Edit Order
            </a>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="ec-odr-dtl card card-default">
            <div className="card-header card-header-border-bottom d-flex justify-content-between">
              <h2 className="ec-odr">Order details</h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-xl-4 col-lg-6">
                  <address className="info-grid">
                    <div className="info-content">
                      <h5 className="title_infos">
                        {" "}
                        <span className="mdi mdi-account-circle"></span>{" "}
                        Customer info
                      </h5>
                      <ul>
                        <li>
                          Name: <span> {order?.fullname}</span>
                        </li>
                        <li>
                          Email: <span>{order?.email}</span>{" "}
                        </li>
                        <li>
                          Phone: <span>{order?.phone_number}</span>
                        </li>
                      </ul>
                    </div>
                  </address>
                </div>

                <div className="col-xl-4 col-lg-6">
                  <address className="info-grid">
                    <div className="info-content">
                      <h5 className="title_infos">
                        {" "}
                        <span className="mdi mdi-cart"></span> Order info
                      </h5>
                      <ul>
                        <li>
                          Address: <span>{order?.address}</span>{" "}
                        </li>
                        <li>
                          Phone: <span>{order?.phone_number}</span>
                        </li>
                        <li>
                          Email: <span>{order?.email}</span>
                        </li>
                        <li>
                          Order date:{" "}
                          <span>{ConvertDate(order?.order_date)}</span>
                        </li>
                        <li>
                          Shipping method: <span>{order?.shipping_method}</span>
                        </li>
                      </ul>
                    </div>
                  </address>
                </div>
                <div className="col-xl-4 col-lg-6">
                  <address className="info-grid">
                    <div className="info-content">
                      <h5 className="title_infos">
                        {" "}
                        <span className="mdi mdi-card-bulleted"></span>Payment
                        info
                      </h5>
                      <ul>
                        <li>
                          Payment method: <span>{order?.payment_method}</span>
                        </li>
                        {order?.transaction_number != null ? (
                          <>
                            {" "}
                            <li>
                              Transaction number:{" "}
                              <span>{order?.transaction_number}</span>{" "}
                            </li>
                            <li>
                              Payment status: <span>Paymment Accepted</span>
                            </li>
                          </>
                        ) : (
                          <li>
                            Payment status: <span>No Payment</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </address>
                </div>
              </div>
            </div>
          </div>

          <div className="ec-odr-dtl card card-default mt-5">
            <div className="card-header card-header-border-bottom d-flex justify-content-between">
              <h2 className="ec-odr">Product summary</h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="table-responsive">
                    <table className="table table-striped o-tbl">
                      <thead>
                        <tr className="line">
                          <td>
                            <strong>Order Detail ID</strong>
                          </td>
                          <td>
                            <strong>Photo</strong>
                          </td>
                          <td>
                            <strong>Product name</strong>
                          </td>
                          <td>
                            <strong>Color</strong>
                          </td>
                          <td>
                            <strong>Size</strong>
                          </td>
                          <td>
                            <strong>Price</strong>
                          </td>
                          <td>
                            <strong>Discount</strong>
                          </td>
                          <td>
                            <strong>Qty</strong>
                          </td>
                          <td>
                            <strong>Sub total</strong>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {order?.order_details.map((orderDetail) => (
                          <tr key={orderDetail.id}>
                            <td>{orderDetail.id}</td>
                            <td>
                              <img
                                className="product-img"
                                src={`${API_BASE_URL}products/images/${orderDetail.product.productImages[0].image_url}`}
                                alt=""
                              />
                            </td>
                            <td>{orderDetail.product.name}</td>
                            <td>{orderDetail.color}</td>
                            <td>{orderDetail.size}</td>
                            <td>${orderDetail.product.price}</td>
                            <td>{orderDetail.product.discount}</td>
                            <td>{orderDetail.numberOfProducts}</td>
                            <td>
                              $
                              {(
                                ((orderDetail.product.price *
                                  (100 - orderDetail.product.discount)) /
                                  100) *
                                orderDetail.numberOfProducts
                              ).toFixed(1)}
                            </td>
                          </tr>
                        ))}

                        <tr>
                          <td colSpan="7"></td>
                          <td className="text-right">
                            <strong>Total:</strong>
                          </td>
                          <td className="text-right">
                            <strong>${order?.total_money}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card ec-odr-dtl card card-default mt-4 trk-order">
            <div className="card-header card-header-border-bottom order_tracking_title">
              <h3>
                Order id: <span>#{order?.id}</span>
              </h3>
            </div>
            <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-custom">
              <div className="order_details_shipment w-100 py-1 px-2">
                <h3>
                  Status: <span>{order?.status.toUpperCase()}</span>
                </h3>
              </div>
              <div className="order_details_shipment w-100 py-1 px-2">
                <h3>
                  Shipping date:{" "}
                  <span>
                    {order?.shipping_date != null
                      ? ConvertDate(order?.shipping_date)
                      : "Not yet shipped"}
                  </span>
                </h3>
              </div>
            </div>
            <div className="card-body">
              <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                <div
                  className={`step ${
                    order?.status === "pending" ||
                    order?.status === "processing" ||
                    order?.status === "shipped" ||
                    order?.status === "delivered"
                      ? "completed"
                      : ""
                  }`}
                >
                  <div className="step-icon-wrap">
                    <div className="step-icon">
                      <i className="mdi mdi-cart-plus"></i>
                    </div>
                  </div>
                  <h4 className="step-title">Approved Order</h4>
                </div>

                <div
                  className={`step ${
                    order?.status === "processing" ||
                    order?.status === "shipped" ||
                    order?.status === "delivered"
                      ? "completed"
                      : ""
                  }`}
                >
                  <div className="step-icon-wrap">
                    <div className="step-icon">
                      <i className="mdi mdi-gift"></i>
                    </div>
                  </div>
                  <h4 className="step-title">Packaging Product</h4>
                </div>
                <div
                  className={`step ${
                    order?.status === "shipped" || order?.status === "delivered"
                      ? "completed"
                      : ""
                  }`}
                >
                  <div className="step-icon-wrap">
                    <div className="step-icon">
                      <i className="mdi mdi-truck-fast"></i>
                    </div>
                  </div>
                  <h4 className="step-title">Shipping</h4>
                </div>
                <div
                  className={`step ${
                    order?.status === "delivered" ? "completed" : ""
                  }`}
                >
                  <div className="step-icon-wrap">
                    <div className="step-icon">
                      <i className="mdi mdi-shopping"></i>
                    </div>
                  </div>
                  <h4 className="step-title">Product Delivered</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {openUpdateModal && (
          <UpdateOrder
            open={openUpdateModal}
            handleClose={handleUpdateClose}
            onLoad={onLoad}
            idObject={orderId}
          />
        )}
      </div>
    </Fragment>
  );
};

export default OrderDetail;
