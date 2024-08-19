import React, { Fragment, useEffect, useState } from "react";
import { API_BASE_URL } from "../../../../config/apiConfig";
import shopping from "../../../../assets/images/icons/shoping.png";
import chart from "../../../../assets/images/icons/chart.png";
import imageUser from "../../../../assets/images/image-user.jpg";

import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import All_API from "../../../../State/Auth/All_API";
import { ToastError } from "../notification/Notification";
import { calculateAverageRating, calculatestock } from "./CaculatorProduct";
import StarRating from "./productdetail/StarRating";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const DetailProduct = () => {
  const { productId } = useParams();
  const [imgMain, setImgMain] = useState("");
  const [product, setProduct] = useState();
  const [active, setActive] = useState(1);
  const navigate = useNavigate();

  async function getProductById(productId) {
    try {
      const response = await All_API.getProductById(productId);
      if (response.data.status === "success") {
        setProduct(response.data.data);
        setImgMain(response.data.data.product_images[0]?.image_url);
      } else {
        ToastError(response.data.status);
        navigate("/admin/products");
      }
    } catch (error) {
      ToastError(error.response.data.message);
      navigate("/admin/products");
    }
  }

  useEffect(() => {
    getProductById(productId);
  }, []);
  return (
    <Fragment>
      <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
        <div>
          <h1>Product Detail</h1>
          <p className="breadcrumbs">
            <span>
              <a onClick={() => navigate("/admin")}>Home</a>
            </span>
            <span>
              <i className="mdi mdi-chevron-right"></i>
            </span>
            Product
          </p>
        </div>
        <div>
          <a
            onClick={() => navigate(`/admin/products`)}
            className="btn btn-primary mr-2"
          >
            View List Product
          </a>
          <a
            onClick={() => navigate(`/admin/products/edit/${productId}`)}
            className="btn btn-primary"
          >
            Edit
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card card-default">
            <div className="card-header card-header-border-bottom">
              <h2>Product Detail</h2>
            </div>

            <div className="card-body product-detail">
              <div className="row">
                <div className="col-xl-4 col-lg-6">
                  <div className="col-lg-12">
                    <div className="ec-vendor-img-upload card-image-detail">
                      <div className="ec-vendor-main-img">
                        <div className="avatar-upload ">
                          <div className="avatar-preview ec-preview">
                            <div className="imagePreview ec-div-preview">
                              <img
                                className="ec-image-preview"
                                src={`${API_BASE_URL}products/images/${imgMain}`}
                                alt="edit"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="thumb-upload-set colo-md-12 mt-3 card-image-info pl-5 pr-5 flex-wrap">
                          {product?.product_images.map((image) => (
                            <div
                              className="thumb-upload col-lg-4 mb-3"
                              key={image.id}
                              onClick={() => setImgMain(image.image_url)}
                            >
                              <div className="thumb-preview ec-preview">
                                <div className="image-thumb-preview">
                                  <img
                                    className="image-thumb-preview ec-image-preview"
                                    src={`${API_BASE_URL}products/images/${image.image_url}`}
                                    alt="edit"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="product_card_bottom_wrapper info-detail">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="card_bottom_items">
                            <div className="card_bottom_item_icon">
                              <img src={shopping} alt="" />
                            </div>
                            <div className="card_bottom_item_text">
                              <p>Total Sales</p>
                              <h3>{product?.total_sales}</h3>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="card_bottom_items">
                            <div className="card_bottom_item_icon">
                              <img src={chart} alt="" />
                            </div>
                            <div className="card_bottom_item_text">
                              <p>In stock</p>
                              <h3>
                                {calculatestock(product?.product_details)}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="row product-overview">
                    <div className="col-12">
                      <h2 className="product-title-twos">{product?.name}</h2>
                      <p className="product-rate">
                        <StarRating
                          rating={calculateAverageRating(product?.comments)}
                        />
                        <span className="detail_review_area">
                          {product?.comments.length} Reviews
                        </span>
                      </p>
                      <p className="product-desc">{product?.description}</p>

                      <div className="product_model_search_area">
                        <ul>
                          <li>
                            Price:{" "}
                            <span className="span_block_area">
                              ${product?.price}
                            </span>
                          </li>
                          <li>
                            Discount:{" "}
                            <span className="span_block_area">
                              {product?.discount}%
                            </span>
                          </li>
                          <li>
                            Color:{" "}
                            <span className="parent_color">
                              <RadioGroup className="mt-0.5">
                                <div className="flex items-center space-x-3">
                                  {[
                                    ...new Set(
                                      product?.product_details.map(
                                        (detail) => detail.color
                                      )
                                    ),
                                  ].map((color, index) => (
                                    <RadioGroup.Option
                                      key={index}
                                      value={color}
                                      className={({ active, checked }) =>
                                        classNames(
                                          active && checked
                                            ? "ring ring-offset-1"
                                            : "",
                                          !active && checked ? "ring-2" : "",
                                          "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                        )
                                      }
                                    >
                                      <RadioGroup.Label
                                        as="span"
                                        className="sr-only"
                                      >
                                        {color}
                                      </RadioGroup.Label>
                                      <span
                                        aria-hidden="true"
                                        className={classNames(
                                          "h-5 w-5 rounded-full border border-black border-opacity-10"
                                        )}
                                        style={{ backgroundColor: color }}
                                      />
                                    </RadioGroup.Option>
                                  ))}
                                </div>
                              </RadioGroup>
                            </span>
                          </li>

                          <li>
                            Size:{" "}
                            <span className="parent_color">
                              {product?.product_details
                                .map((detail) => detail.size)
                                .filter(
                                  (value, index, self) =>
                                    self.indexOf(value) === index
                                ) // Loại bỏ trùng lặp
                                .join(", ")}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="row review-rating mt-4">
                    <div className="col-12">
                      <ul
                        className="nav nav-tabs"
                        id="myRatingTab"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            onClick={() => setActive(1)}
                            className={`nav-link ${
                              active === 1 ? "active" : ""
                            }`}
                            id="product-reviews-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#productreviews"
                            href="#productreviews"
                            role="tab"
                            aria-selected="false"
                          >
                            <i className="mdi mdi-star-half mr-1"></i> Reviews
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content" id="myTabContent2">
                        <div
                          onClick={() => setActive(1)}
                          className={`tab-pane pt-3 fade ${
                            active === 1 ? "show active" : ""
                          }`}
                          id="productreviews"
                          role="tabpanel"
                        >
                          {product?.comments.map((comment) => (
                            <div className="ec-t-review-wrapper">
                              <div className="ec-t-review-item">
                                <div className="ec-t-review-avtar">
                                  <img src={imageUser} alt="" />
                                </div>
                                <div className="ec-t-review-content">
                                  <div className="ec-t-review-top">
                                    <p className="ec-t-review-name">
                                      {comment.name}
                                    </p>
                                    <div className="ec-t-rate custom_rating_gap">
                                      <StarRating rating={comment.rating} />
                                      <span className="rating_outof">
                                        {comment.rating} out of 5
                                      </span>
                                    </div>
                                  </div>
                                  <div className="ec-t-review-bottom">
                                    <p>
                                      Consectetur exercitation non eiusmod enim
                                      adipisicing mollit velit qui adipisicing.
                                      Tempor enim fugiat minim et qui incididunt
                                      esse incididunt cillum fugiat.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DetailProduct;
