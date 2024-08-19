import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import All_API from '../../../State/Auth/All_API';
import { ToastError, ToastSuccess } from '../../../admin/components/BodyMain/notification/Notification';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { idOrder } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vnp_TransactionNo = searchParams.get('vnp_TransactionNo');
  const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');


  useEffect(() => {
    if (idOrder && vnp_TransactionNo && vnp_ResponseCode === '00') {
      
      payOrderSuccess(idOrder, vnp_TransactionNo, vnp_ResponseCode)
      
      async function payOrderSuccess(orderId, vnp_TransactionNo, vnp_ResponseCode) {
        try{
          const response = await All_API.payOrderSuccess(orderId, vnp_TransactionNo, vnp_ResponseCode)
          if(response.data.status === "success") {
            ToastSuccess("Order payment successfully.")
            window.location.href = "/checkout?step=2"
          }else {
            ToastError(response.data.message)
          }
        }catch (error){
          ToastError(error.response.data.message)
        }
      }

    }
}, []);

  return (
    <div className="flex  justify-center min-h-screen ">
      <div className=" p-6  mt-2 max-w-sm w-full text-center">
       <div className='flex text-center  justify-center'>
       <svg style={{color: "#22c55e"}} className=" icon-ord-success text-green-500   mx-auto"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-11">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
       </div>

        <h2 className="text-2xl font-bold text-gray-800 mt-2 ">Order Successful!</h2>
        <p className="text-gray-600 mt-2">Thank you for your purchase. Your order has been placed successfully.</p>
        <button onClick={()=> navigate('/')} className="mt-4 px-4 py-2 bg-[#5b93ff] text-white rounded-md hover:bg-black transition">
          View Order Details
        </button>
      </div>
    </div> 
  );
};

export default OrderSuccess;