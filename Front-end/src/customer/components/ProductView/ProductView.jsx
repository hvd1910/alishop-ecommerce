import React, { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import All_API from '../../../State/Auth/All_API';
import { ToastError, ToastSuccess } from '../../../admin/components/BodyMain/notification/Notification';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config/apiConfig';
import { Rating } from '@mui/material';
import { calculateAverageRating } from '../../../admin/components/BodyMain/product/CaculatorProduct';
import { addToCart } from '../Cart/CartAction';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ProductView = ({handleCancel,onLoad, idProduct}) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);



  const handleSubmit = (event) => {
		event.preventDefault();
	
		const data = new FormData(event.currentTarget);
	  if(selectedColor !== null && selectedSize !== null) {
    const cartItem = {
      product_id: idProduct,
			color: selectedColor,
      size: selectedSize,
      quantity: 1
		};
    addToCart(cartItem)
    ToastSuccess("Product add to cart successfully.")
    handleCancel()
    }else if(selectedColor !== null && selectedSize === null && availableSizes.length === 0){
      const cartItem = {
        product_id: idProduct,
        color: selectedColor,
        size: '',
        quantity: 1
      };
      addToCart(cartItem)
      ToastSuccess("Product add to cart successfully.")
      handleCancel()
    }else {
      ToastError("Please select enough information.")
    }

		
	  
  }



  const availableSizes = Array.from(
    new Set(
      product?.product_details
        .filter((detail) =>
          selectedColor ? detail.color === selectedColor : true
        )
        .map((detail) => detail.size)
        .filter((size) => size !== "")
    )
  );

  const availableColors = Array.from(
    new Set(
      product?.product_details
        .filter((detail) =>
          selectedSize ? detail.size === selectedSize : true
        )
        .map((detail) => detail.color)
    )
  );


  
  const selectedProductDetail = product?.product_details.find(
    (detail) => detail.size === selectedSize && detail.color === selectedColor
  );



  async function getProductById(id) {
    try {
      const response = await All_API.getProductById(id);
      if (response.data.status === "success") {
        setProduct(response.data.data);
      } else {
        ToastError(response.data.status);
        navigate("/");
      }
    } catch {
      ToastError("please try again");
      navigate("/");
    }
  }

  useEffect(()=> {
    getProductById(idProduct)
  }, [idProduct])

  return (
    
              <div className="bg-white  rounded-lg">
                <div className="relative bg-white rounded-lg px-4 pb-6 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 ">
                  <button
                    type="button"
                    onClick={()=>handleCancel()}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img alt={product?.product_images[0].image_url} src={`${API_BASE_URL}products/images/${product?.product_images[0].image_url}`} className="object-cover object-center" />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product?.name}</h2>

                      <section aria-labelledby="information-heading" className="mt-2">
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                       <div className='flex space-x-2 items-center text-lg lg-text-xl text-gray-600 mt-2'>
                       <p className="font-semibold text-lg">
                          ${(product?.price * (100 - product?.discount)) / 100}
                        </p>
                        <p className="opacity-50 line-through"> ${product?.price}</p>
                        <p className="text-green-500 font-semibold">
                          {product?.discount}% Off
                        </p>
                       </div>

                        <div className="mt-1">
                          <h4 className="sr-only">Reviews</h4>
                          <div className="flex items-center">
                          <div className="flex items-center space-x-3">
                  <Rating
                    name="read-only"
                    value={
                      calculateAverageRating(product?.comments) > 0
                        ? calculateAverageRating(product?.comments)
                        : 5
                    }
                    precision={0.5}
                    readOnly
                  />
                  <p className="opacity-50 text-sm">
                    {calculateAverageRating(product?.comments)} Ratings
                  </p>
                  <p className="ml-3 text-sm font-medium text-indigo-60 hover:text-indigo-500">
                    {product?.comments.length} Reviews
                  </p>
                </div>
                          </div>
                        </div>
                      </section>

                      <section aria-labelledby="options-heading" className="mt-10">
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>

                        <form onSubmit={handleSubmit}>
                          {availableColors.length > 0 && <fieldset aria-label="Choose a color">
                            <legend className="text-sm font-medium text-gray-900">Color</legend>

                            <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {availableColors.map((color, index) => (
                        <RadioGroup.Option
                          key={index}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              "h-8 w-8 rounded-full border border-black border-opacity-10"
                            )}
                            style={{ backgroundColor: color }}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                            </RadioGroup>
                          </fieldset>}

                          {availableSizes.length > 0 &&  <fieldset aria-label="Choose a size" className="mt-10">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium text-gray-900">Size</div>
                              <a className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                Size guide
                              </a>
                            </div>

                            <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {availableSizes.map(
                        (size, index) =>
                          size !== "" && (
                            <RadioGroup.Option
                              key={index}
                              value={size}
                              disabled={product.product_details.some(
                                (detail) =>
                                  detail.size === size && detail.qty === 0
                              )}
                              className={({ active }) =>
                                classNames(
                                  product.product_details.some(
                                    (detail) =>
                                      detail.size === size && detail.qty !== 0
                                  )
                                    ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                    : "cursor-not-allowed bg-gray-50 text-gray-200",
                                  active ? "ring-2 ring-indigo-500" : "",
                                  "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                )
                              }
                            >
                              {({ active, checked }) => (
                                <>
                                  <RadioGroup.Label as="span">
                                    {size}
                                  </RadioGroup.Label>
                                  {product.product_details.some(
                                    (detail) =>
                                      detail.size === size && detail.qty !== 0
                                  ) ? (
                                    <span
                                      className={classNames(
                                        active ? "border" : "border-2",
                                        checked
                                          ? "border-indigo-500"
                                          : "border-transparent",
                                        "pointer-events-none absolute -inset-px rounded-md"
                                      )}
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <span
                                      aria-hidden="true"
                                      className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                    >
                                      <svg
                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                        viewBox="0 0 100 100"
                                        preserveAspectRatio="none"
                                        stroke="currentColor"
                                      >
                                        <line
                                          x1={0}
                                          y1={100}
                                          x2={100}
                                          y2={0}
                                          vectorEffect="non-scaling-stroke"
                                        />
                                      </svg>
                                    </span>
                                  )}
                                </>
                              )}
                            </RadioGroup.Option>
                          )
                      )}
                    </div>
                            </RadioGroup>
                          </fieldset>}
{/* Quantity */}
{selectedSize && selectedColor && selectedProductDetail && (
                  <div className="mt-1 mb-3">
                    <h3 className="text-sm font-medium text-gray-900 opacity-50 ">
                      Quantity Available: {selectedProductDetail.qty}
                    </h3>
                  </div>
                )}
                          <button
                            type="submit"
                            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Add to bag
                          </button>
                        </form>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
     
  );
};

export default ProductView;
