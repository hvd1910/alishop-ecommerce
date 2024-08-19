import React, { Fragment, useState } from "react";
import { API_BASE_URL } from "../../../config/apiConfig";
import { useNavigate } from "react-router-dom";
import ProductQuickView from "../../pages/ProductQuickView";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate()
  const originalPrice = Math.round(product?.price ?? 0);
  const discount = product?.discount;
  const discountedPrice = originalPrice - originalPrice * (discount / 100);
  const [loading, setLoading] = useState(false)
  const [openQuickView, setOpenQuickView] = useState(false);


  const handleLoading = ()=> {
    setLoading(!loading)
  }

  const handleQuickView = () => {
    setOpenQuickView(true);
  };

  const handleQuickViewClose = () => {
    setOpenQuickView(false);
  };

 


  return (
  <Fragment>
      <div  className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden w-[15rem] mx-3 border hover:shadow-lg relative mb-4">
      <div  className="absolute top-0 left-0 bg-red-500 text-white text-sm font-bold py-1 px-2 rounded-br-lg z-10">
        {discount}%
      </div>
      <div onClick={()=> navigate(`/product/${product?.id}`)}  className="h-[13rem] relative">
        <img
          className="object-cover  w-[208px] h-[208px]"
          src={`${API_BASE_URL}products/images/${product?.product_images[0].image_url}`}
          alt=""
        />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-white bg-opacity-90 transition duration-300"></div>
      </div>

      <div className="p-0 mb-3 pl-4 pr-4 text-center w-full">
        <h3 onClick={()=> navigate(`/product/${product?.id}`)} 
          className="text-lg font-medium text-gray-900 w-full"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxHeight: "2.2rem",
            lineHeight: "2.2rem",
          }}
        >
          {product?.name}
        </h3>
        <div className="flex text-left space-x-0 mb-1 justify-center items-center w-full">
          <p onClick={()=> navigate(`/product/${product?.id}`)}  className="text-lg text-red-500 font-bold">
            ${discountedPrice.toFixed(1)}
          </p>
          <p onClick={()=> navigate(`/product/${product?.id}`)}  className="text-sm text-gray-500 line-through mt-0.4">
            ${originalPrice.toFixed(0)}
          </p>
          <a onClick={handleQuickView} className="ml-auto rounded-md bg-[#333] px-2 py-1 text-center text-sm font-medium text-white hover:bg-blue-600 hover:bg-opacity-80 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add
          </a>
        </div>
      </div>
    </div>
    {openQuickView && (
          <ProductQuickView open={openQuickView} handleClose={handleQuickViewClose} onLoad={handleLoading} idProduct={product.id}/>
        )}  </Fragment>

  );
};

export default HomeProductCard;
