import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Rating,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import All_API from "../../../State/Auth/All_API";
import { ToastError, ToastSuccess } from "../../../admin/components/BodyMain/notification/Notification";
import { API_BASE_URL } from "../../../config/apiConfig";
import { calculateAverageRating } from "../../../admin/components/BodyMain/product/CaculatorProduct";
import ProductDescription from "./ProductDescription";
import ProductReviewCard from "./ProductReviewCard";
import HomeSectionCarosel from "../HomeSectionCrosel/HomeSectionCarosel";
import { addToCart } from "../Cart/CartAction";



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [productsCategory, setProductsCategory] = useState([]);
  const [categoryId, setCategoryId] = useState('')
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [imgMain, setImgMain] = useState("");
  const [valueRating, setValueRating] = useState(2);
  

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

  
  
 

  const handleAddToCart = (event) => {
		event.preventDefault();
	
		const data = new FormData(event.currentTarget);
	  if(selectedColor !== null && selectedSize !== null) {
    const cartItem = {
      product_id: parseInt(productId),
			color: selectedColor,
      size: selectedSize,
      quantity: 1
		};
    addToCart(cartItem)
    ToastSuccess("Product add to cart successfully.")
    }else if(selectedColor !== null && selectedSize === null && availableSizes.length === 0){
      const cartItem = {
        product_id: parseInt(productId),
        color: selectedColor,
        size: '',
        quantity: 1
      };
      addToCart(cartItem)
      ToastSuccess("Product add to cart successfully.")
    }else {
      ToastError("Please select enough information.")
    }

		
	  
  }
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
	
		const data = new FormData(event.currentTarget);
		const review = {
            user_id: 1,
            product_id: productId,
			      rating: data.get("rating"),
            content: data.get("content")
		};
    createReview(review)
  } 


  async function createReview(productData) {
    try{
    const response = await All_API.createReview(productData)
    if(response.data.status === "success") {
      ToastSuccess(response.data.message)
    }else {
      ToastError(response.data.message)
    }
    }catch (error){
    ToastError(error.response.data.message)
    }
  }



  async function getProductById(productId) {
    try {
      const response = await All_API.getProductById(productId);
      if (response.data.status === "success") {
        setProduct(response.data.data);
        setImgMain(response.data.data.product_images[0].image_url);
        setCategoryId(response.data.data.category_id)
      } else {
        ToastError(response.data.status);
        navigate("/");
      }
    } catch {
      ToastError("please try again");
      navigate("/");
    }
  }

  async function getProductByCategory(data) {
    try{
      const response = await All_API.getAllProducts(data)
      setProductsCategory(response.data.data.products)
    
    }catch {
      
    }
  }


  useEffect(() => {
      const data = {
      categoryId: categoryId,
      colors:  '',
      sizes:  '',
      minPrice: 0,
      maxPrice: 100000000,
      minDiscount: 0,
      sort:'stock_high',
      page: '',
      limit: 10,
      keyword:'',
    }

    getProductById(productId);

   if(!product) {
    getProductByCategory(data)
   }

  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white lg:px-20 ">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li onClick={() => navigate("/")}>
              <div className="flex items-center">
                <a className="mr-2 text-sm font-medium text-gray-900 cursor-pointer">
                  {" "}
                  Home
                </a>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li onClick={() => navigate(`/shop`)}>
              <div className="flex items-center">
                <a className="mr-2 text-sm font-medium text-gray-900 cursor-pointer">
                  {" "}
                  Shop
                </a>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-sm">
              <a
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product?.name}
              </a>
            </li>
          </ol>
        </nav>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8  gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem] border border-gray-900">
              <img
                src={`${API_BASE_URL}products/images/${imgMain}`}
                alt={imgMain}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-wrap space-x-5 justify-center pt-4">
              {product?.product_images.map((item) => (
                <div
                  key={item.id}
                  className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] border border-gray-900 cursor-pointer"
                  onClick={() => setImgMain(item.image_url)}
                >
                  <img
                    src={`${API_BASE_URL}products/images/${item.image_url}`}
                    alt={item.image_url}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div
            className="log:col-span-1 maxt-auto max-w-2x1 px-4 pb-16 sm:px-6 lg:max-w-7x1 lg:px-8
        lg:pb-24"
          >
            <div className="lg:col-span-2 ">
              <h1 className="text-lg lg:text-xl font-semibold text-gray-800">
                {product?.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-1 lg:row-span-3 lg:mt-0">
              <div className="flex space-x-4 items-center text-lg lg-text-xl text-gray-600 mt-2">
                <p className="font-semibold text-lg">
                  ${((product?.price * (100 - product?.discount)) / 100).toFixed(1)}
                </p>
                <p className="opacity-50 line-through"> ${product?.price}</p>
                <p className="text-green-500 font-semibold">
                  {product?.discount}% Off
                </p>
              </div>
              {/* Reviews */}
              <div className="mt-1">
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

              <form className="mt-10" onSubmit={handleAddToCart} >
                {/* Sizes */}
                <div className="mt-10 mb-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-600">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
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
                </div>

                {/* Colors */}
                <div className="mb-5">
                  <h3 className="text-sm font-bold text-gray-600">Color</h3>

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
                </div>

                {/* Quantity */}
                {selectedSize && selectedColor && selectedProductDetail && (
                  <div className="mt-1 mb-3">
                    <h3 className="text-sm font-medium text-gray-900 opacity-50 ">
                      Quantity Available: {selectedProductDetail.qty}
                    </h3>
                  </div>
                )}

                <Button
                  className="hover:hover:bg-black"
                  variant="contained"
                  type="submit"
                  sx={{ px: "2rem", py: "0.7rem", bgcolor: "#5B93FF" }}
                >
                  Add to cart
                </Button>
              </form>
            </div>

            <div className="py-4 lg:col-span-2 lg:col-start-1   lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="text-sm font-bold text-gray-600 mb-3">
                  Description
                </h3>

                <div className="space-y-6">
                  <ProductDescription description={product?.description} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rating and reviews */}
        <section >
          <h1 className="font-semibold text-lg pb-4">
            {" "}
            Recent Review & Rating
          </h1>

          <div className="border p-5">
            <Grid container spacing={7}>
              <Grid item xs={7}>
                <div className="space-y-5">
                  {product?.comments.slice(0, 2).map((item) => (
                    <ProductReviewCard key={item?.id} comment={item}  />
                  ))}
                  <form onSubmit={handleSubmit} className=" bg-white rounded-lg p-2 mx-auto mt-20 ">
                  <div className="px-3 mb-2 mt-2">
                    <Typography component="legend">Your Rating</Typography>
                    <Rating
                      name="rating"
                      value={valueRating}
                      onChange={(event, newValue) => {
                        setValueRating(newValue);
                      }}
                    />
                    </div>
                    <div className="px-3 mb-2 mt-2">
                      <textarea
                      name="content"
                        placeholder="Write your review..."
                        className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                      ></textarea>
                    </div>
                    <div className="flex justify-end px-4 ">
                      <button
                        type="submit"
                        className="px-2.5 py-1.5 rounded-md text-white text-sm bg-[#5B93FF] hover:bg-black"
                      >
                        Sent Review
                      </button>
                    </div>
                  </form>
                </div>
              </Grid>
              <Grid item xs={5}>
                <h1 className="text-xl font-semibold pb-2">Product Ratings</h1>

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
                  <p className="opacity-50">
                    {calculateAverageRating(product?.comments)} Ratings
                  </p>
                </div>
                <Box className="mt-5 space-y-3">
                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p>Excellent</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={40}
                        color="success"
                      />
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p>Very Good</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={30}
                        color="success"
                      />
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p>Good</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{
                          bgcolor: "#d0d0d0",
                          borderRadius: 4,
                          height: 7,
                          color: "yellow",
                        }}
                        variant="determinate"
                        value={25}
                      />
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p>Avarage</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={20}
                        color="warning"
                      />
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p>Poor</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={10}
                        color="error"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>

        {/* Similer products */}
        <section className="pt-2 ">
          <h1 className="py-5 text-xl font-bold">Similer Products</h1>
          <HomeSectionCarosel data={productsCategory} />


        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
