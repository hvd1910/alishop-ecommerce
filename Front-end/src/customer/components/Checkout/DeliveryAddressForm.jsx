import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdressCard from "../AdressCard/AdressCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../../../State/Auth/authCustomerSlice';
import { GetCart, removeCart } from "../../../State/Auth/cartSlice";
import { ToastError, ToastSuccess } from "../../../admin/components/BodyMain/notification/Notification";
import All_API from "../../../State/Auth/All_API";

const DeliveryAddressForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(GetUser)
  const cart  = useSelector(GetCart)
  const [paymentMethod, setPaymentMethod] = useState('pod');
  const [deliveryMethod, setDeliveryMethod] = useState('Free')
  const [voucher, setVoucher] = useState(null);
  const [couponSuccess, setCouponSuccess] = useState(null);
  const [valueDel, setValueDel] = useState(0)
  const [totalAmount, setTotalAmount] = useState((Number(cart?.totalAmount) + valueDel).toFixed(1))
  const [totalDiscount, setTotalDiscount] = useState(cart?.totalDiscount)

  
  
  

  const handlePayChange = (paythod) => {
    setPaymentMethod(paythod);
  };
  const handleDeliveryChange = (delmethod) => {
    setDeliveryMethod(delmethod);
  }

  const handleVoucherChange = (event) => {
    setVoucher(event.target.value);
  };

  const handleVoucher = (e) => {
    getVoucherCaculator(voucher, totalAmount)
  };




    const handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget)

      const orderData = {
          user_id: user?.id,
          fullname:data.get("fullname"),
          email:data.get("email"),
          phone_number:data.get("phone_number"),
          address:data.get("address"),
          note: data.get("note"),
          coupon_code: couponSuccess || '',
          shipping_method: deliveryMethod,
          payment_method: paymentMethod,
          total_money: totalAmount,
          cart_items: cart?.carts
      }


      const emailData = {
        "toEmail": data.get("email"),
        "subject": "Order Successfully By AliShop",
        "orderDTO": orderData
      }

      if(user !== null) {
        if(cart !== null) {
          createOrder(orderData)
        }else{
          ToastError("Cart empty, please try again.")
          navigate("/")
        }
      }
      else{
        ToastError("Please login to your account, it will take 2 seconds to login.")
        setTimeout(function() {
          window.location.href = "/login";
      }, 2500);      }
    
      
       
       
        async function createOrder(orderData) {
          try{
            const response = await All_API.createOrder( orderData)
            if(response.data.status === "success") {
              dispatch(removeCart())
              localStorage.removeItem('cart');
              sentEmail(emailData)

              if(paymentMethod === "vnpay") {
                getUrlBank(response.data.data.id,response.data.data.total_money)
              }else {
                window.location.href = '/checkout?step=2'
                ToastSuccess("Order Successfully.")
              }
            }else {
              ToastError(response.data.message)
            }
          }catch (error){
            ToastError(error.response.data.message)
          }
        }

        async function getUrlBank(orderId, total) {
          try{
            const response = await All_API.getUrlBank(orderId, total)
            if(response.data.status === "success") {
              window.location.href = response.data.paymentUrl
            }else {
              ToastError(response.data.message)
            }
          }catch (error){
            ToastError(error.response.data.message)
          }
        }


        async function sentEmail(emailData) {
          try{
            
            const response = await All_API.sentEmail(emailData)
            
            if(response.data.status === "success") {
             
            }else {
              // ToastError(response.data.message)
            }
          }catch (error){
            // ToastError(error.response.data.message)
          }
        }


       
    }

    async function getVoucherCaculator(couponCode, totalAmount) {
      try{
        const response = await All_API.getVoucherCaculator(couponCode, totalAmount)
        if(response.data.status === "success") {
          if(totalAmount > response.data.data.total_amount) {
            setCouponSuccess(voucher)
            setTotalAmount(response.data.data.total_amount.toFixed(1))
            setTotalDiscount((cart?.totalCartPrice - response.data.data.total_amount).toFixed(1))
            ToastSuccess("Apply coupon successfully.")
          }else{
            ToastError("Apply coupon failed.")
          }
        }else {
          ToastError(response.data.message)
        }
      }catch (error){
        ToastError(error.response.data.message)
      }
    }


    const [formData, setFormData] = useState({
      fullname: user?.fullname || '',
      email: user?.email || '',
      phone_number: user?.phone_number || '',
      address: user?.address || ''
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    
    };
  



    useEffect(()=> {
      if(deliveryMethod === 'Express'){
        setValueDel(49)
      }else if(deliveryMethod === 'Free') {
          if(valueDel > 0) {
            setValueDel(0)
          }
      }
    }, [deliveryMethod, valueDel])
  return (
    <section className="antialiased dark:bg-gray-900 md:py-3 ">
    <form onSubmit={handleSubmit} className="mx-auto max-w-screen-xl  2xl:px-0">
  
      <div className=" sm:mt-8 lg:flex lg:items-start lg:gap-4 xl:gap-8">
        <div className="min-w-0  space-y-8 w-[2/3]">
          <div className="space-y-4 ">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Address</h2>
  
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="fullname" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Full name </label>
                <input type="text" value={formData.fullname} 
                    onChange={handleInputChange}
                    id="fullname" name="fullname" className="block w-full rounded-lg border-1 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Nguyen Van A" required />
              </div>
  
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Email* </label>
                <input type="email" id="email" name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                     className="block w-full rounded-lg border-1 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="name@gmail.com" required />
              </div>
  
             
  
              <div>
                <label htmlFor="phone-input-3" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Phone Number* </label>
                <div className="flex items-center">
                  <button id="dropdown-phone-button-3 " data-dropdown-toggle="dropdown-phone-3" className="z-10 inline-flex shrink-0 items-center rounded-s-lg border-2 border-gray-300 bg-gray-100 px-3 py-[11px] text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700" type="button">
                  <svg fill="none" aria-hidden="true" className="me-2 h-4 w-4" viewBox="0 0 20 15" xmlns="http://www.w3.org/2000/svg">
                    <rect width="20" height="15" fill="#DA251D" />
                    <polygon 
                      fill="#FFFF00" 
                      points="10,3 11.176,7.235 15.618,7.235 11.971,9.528 13.147,13.764 10,11.471 6.853,13.764 8.029,9.528 4.382,7.235 8.824,7.235"
                      transform="translate(0, -1)" // Điều chỉnh vị trí để ngôi sao cân đối ở giữa
                    />
                  </svg>
                    +84
                    <svg className="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                    </svg>
                  </button>
                  <div id="dropdown-phone-3" className="z-10 hidden w-56 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700">
                    <ul className="p-2 text-sm font-medium text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-phone-button-2">
                      <li>
                        <button type="button" className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                          <span className="inline-flex items-center">
                            <svg fill="none" aria-hidden="true" className="me-2 h-4 w-4" viewBox="0 0 20 15">
                              <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                              <mask id="a"  width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
                                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                              </mask>
                              <g mask="url(#a)">
                                <path fill="#D02F44" fillRule="evenodd" d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z" clipRule="evenodd" />
                                <path fill="#46467F" d="M0 .5h8.4v6.533H0z" />
                                <g filter="url(#filter0_d_343_121520)">
                                  <path
                                    fill="url(#paint0_linear_343_121520)"
                                    fillRule="evenodd"
                                    d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                                    clipRule="evenodd"
                                  />
                                </g>
                              </g>
                              <defs>
                                <linearGradient id="paint0_linear_343_121520" x1=".933" x2=".933" y1="1.433" y2="6.1" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#fff" />
                                  <stop offset="1" stopColor="#F0F0F0" />
                                </linearGradient>
                                <filter id="filter0_d_343_121520" width="6.533" height="5.667" x=".933" y="1.433" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                  <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                  <feOffset dy="1" />
                                  <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                  <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_343_121520" />
                                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_343_121520" result="shape" />
                                </filter>
                              </defs>
                            </svg>
                            United States (+1)
                          </span>
                        </button>
                      </li>
                    
                    </ul>
                  </div>
                  <div className="relative w-full">
                    <input  type="text" id="phone-input" name="phone_number" 
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        className="z-20 block w-full rounded-e-lg border-1 border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-300 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"  placeholder="0123456789" required />
                  </div>
                </div>
              </div>
  
              <div >
                <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Address* </label>
                <input type="address" id="address" name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border-1 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="So 6, Vinh, Nghe An, Viet Nam" required />
              </div>
  
              <div className="sm:col-span-2">
                <label htmlFor="company_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Note</label>
                <textarea 
                  id="note" 
                  name="note"
                  className="block w-full rounded-lg border-1 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" 
                  placeholder="Your note" 
                  style={{ width: "100%" }}
                >
                </textarea>
              </div>
  
       
  
              {/* <div className="sm:col-span-2">
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg border-1 border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                  <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                  Add new address
                </button>
              </div> */}
            </div>
          </div>
  
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Methods</h3>
  
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border-1 border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input 
                     checked={deliveryMethod === 'Free'} 
                     onChange={()=> handleDeliveryChange('Free')}
                     id="fedex" aria-describedby="fedex-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-300 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                  </div>
  
                  <div className="ms-4 text-sm">
                    <label htmlFor="fedex" className="font-medium leading-none text-gray-900 dark:text-white"> Free Delivery - FedEx </label>
                    <p id="fedex-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Received within 5 to 7 days from order date</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border-1 border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                     checked={deliveryMethod === 'Fast'} 
                      onChange={()=> handleDeliveryChange('Fast')}
                      disabled
                     id="dhl" aria-describedby="dhl-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-300 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"  />
                  </div>
  
                  <div className="ms-4 text-sm">
                    <label htmlFor="dhl" className="font-medium leading-none text-gray-900 dark:text-white"> $15 - DHL Fast Delivery </label>
                    <p id="dhl-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it by Tommorow</p>
                  </div>
                </div>
              </div>
  
            
  
              <div className="rounded-lg border-1 border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input 
                    disabled
                     checked={deliveryMethod === 'Express'} 
                     onChange={()=> handleDeliveryChange('Express')}
                     id="express" aria-describedby="express-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-300 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                  </div>
  
                  <div className="ms-4 text-sm">
                    <label htmlFor="express" className="font-medium leading-none text-gray-900 dark:text-white"> $49 - Express Delivery </label>
                    <p id="express-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Payment</h3>
  
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border-1 border-gray-200 bg-gray-50 px-4 pt-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">

                    <input checked={paymentMethod === 'cod'} 
                          onChange={()=>handlePayChange('cod')} disabled
                    id="credit-card" aria-describedby="credit-card-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-300 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"  />
                  </div>
  
                  <div className="ms-4 text-sm">
                    <label htmlFor="credit-card" className="font-medium leading-none text-gray-900 dark:text-white"> Credit Card </label>
                    <p id="credit-card-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Pay with your credit card</p>
                  </div>
                </div>
              </div>
  
              <div className="rounded-lg border-1 border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                    checked={paymentMethod === 'pod'} 
                    onChange={()=>handlePayChange('pod')} 
                     id="pay-on-delivery" aria-describedby="pay-on-delivery-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-300 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                  </div>
  
                  <div className="ms-4 text-sm">
                    <label htmlFor="pay-on-delivery" className="font-medium leading-none text-gray-900 dark:text-white"> Payment on delivery </label>
                    <p id="pay-on-delivery-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Pay directly in cash</p>
                  </div>
                </div>
             
              </div>
  
              <div className="rounded-lg border-1 border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input 
                    checked={paymentMethod === 'vnpay'} 
                    onChange={()=>handlePayChange('vnpay')} 
                    id="paypal-2" aria-describedby="paypal-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-300 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                  </div>
                  <div className="ms-4 text-sm">
                    <label htmlFor="paypal-2" className="font-medium leading-none text-gray-900 dark:text-white"> VNPAY Wallet </label>
                    <p id="paypal-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Connect to your account</p>
                  </div>
                </div>
  
              
              </div>
            </div>
          </div>
  
          <div className="mb-6">
            <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Enter a gift card, voucher or promotional code </label>
            <div className="flex max-w-md items-center gap-4">
            <input
  type="text"
  value={voucher}
  onChange={handleVoucherChange}
  id="voucher"
  name="voucher"
  className={`block w-full rounded-lg border-1 p-2.5 text-sm focus:border-primary-500 focus:ring-primary-500 ${
    couponSuccess !== null
      ? "bg-gray-100 text-gray-400 cursor-not-allowed" // Darker background when disabled
      : "bg-gray-50 text-gray-900"
  } dark:border-gray-300 dark:bg-gray-100 dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
  placeholder="Enter your voucher code"
  disabled={couponSuccess !== null} // Disable input if couponId is not null
/>

              <button 
                type="button" 
                onClick={handleVoucher} 
                className="flex items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-black focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-black dark:focus:ring-blue-800"
              >
               Apply
              </button>

            </div>
          </div>
        </div>
  
        <div className="sticky top-[30px] h-[100vh] lg:mt-0 w-1/3">
            <div
              className=" pt-5 px-5  rounded-lg mt-4"
              style={{ backgroundColor: "#ebeef1" }}
            >
              <p className="uppercase font-bold opacity-60 pb-1">
                Price details
              </p>
              <div className=" font-medium mb-10 " style={{ color: "#616161" }}>
                <div
                  className="flex justify-between py-[16px] text-black border-b"
                  style={{ borderBottomColor: "#d6d8db" }}
                >
                  <span style={{ color: "#616161" }}>Price</span>
                  <span className="text-gray-700">${cart?.totalCartPrice}</span>
                </div>
                <div
                  className="flex justify-between py-[16px] border-b"
                  style={{ borderBottomColor: "#d6d8db" }}
                >
                  <span>Disccount</span>
                  <span className="text-gray-700">
                    -${totalDiscount}
                  </span>
                </div>
                <div
                  className="flex justify-between py-[16px] border-b"
                  style={{ borderBottomColor: "#d6d8db" }}
                >
                  <span>Delivery Charge</span>
                  <span className="text-gray-700">{valueDel > 0 && '$'}{valueDel >  0 ? valueDel :  'Free'}</span>
                </div>
                <div
                  className="flex justify-between py-[16px]  font-bold"
                  style={{ fontSize: "16px" }}
                >
                  <span>Total Amount</span>
                  <span
                    className="text-gray-700 font-bold"
                    style={{ fontSize: "16px" }}
                  >
                    ${totalAmount}
                  </span>
                </div>
              </div>
              <Button
                type="submit"
                variant="contained"
                className="w-full mt-2 mb-4 hover:hover:bg-black"
                sx={{ px: "2.5rem", py: "0.7rem", bgcolor: "#5B93FF" }}
              >
                Check out
              </Button>
            </div>
          </div>
      </div>
    </form>
  </section>
  );
};

export default DeliveryAddressForm;
