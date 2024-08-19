import React, { useEffect, useState } from 'react'
import SelectInputBase from '../../Input/SelectInputBase';
import InputLayout from '../../Input/InputLayout';
import All_API from '../../../../State/Auth/All_API';
import { ToastError, ToastSuccess } from '../notification/Notification';
import { useNavigate } from 'react-router-dom';

const UpdateOrderForm = ({idObject, handleCancel,  onLoad}) => {
    const [order, setOrder] = useState({})
    const navigate = useNavigate();
   
    const handleSubmit = (event) => {
		event.preventDefault();
	
		const data = new FormData(event.currentTarget);
		const orderData = {
			      fullname: data.get("fullname"),
            email: data.get("email"),
            phone_number: data.get("phone_number"),
            address: data.get("address"),
            status: data.get("status")
		};
    async function updateOrderInfo(id, orderData) {
      try{
        const response = await All_API.updateOrderInfo(id, orderData)
        if(response.data.status === "success") {
          ToastSuccess(response.data.message)
          onLoad()
          handleCancel()
        }else {
          ToastError(response.data.message)
          handleCancel()
        }
      }catch (error){
        ToastError(error.response.data.message)
        handleCancel()
      }
    }
    updateOrderInfo(idObject,orderData)
	  }

      
    
    const StatusArr = [{
        id: 1,
        name: "pending",
        
      },
      {
        id: 2,
        name: "processing"
      },
      {
        id: 3,
        name: "shipped"
      },
      {
        id: 4,
        name: "delivered"
      },
      {
        id: 5,
        name: "cancelled"
      },
    ]



    async function getOrderById(orderId) {
      try {
        const response = await All_API.getOrderDetail(orderId);
        if (response.data.status === "success") {
          setOrder(response.data.data);
        } else {
          ToastError(response.data.message);
          navigate("/admin/orders");
        }
      } catch (error){
        ToastError(error.response.data.message);
        navigate("/admin/orders");
      }
    }


      useEffect(()=> {
        getOrderById(idObject)
      }, [])
  return (
    <div className="row">
    <div className="">
        <div className="ec-cat-list card card-default mb-24px">
            <div className="card-body">
                <div className="ec-cat-form">
                    <h4>Edit Product Detail</h4>

                    <form className="row" onSubmit={handleSubmit}>
                        <div className="form-group col-12 ">
                               <label htmlFor="text" className="col-form-label">Full Name</label> 
                               <InputLayout name="fullname"  type="text" value={order?.fullname}/>
                        </div>

                        <div className="form-group col-6 ">
                               <label htmlFor="text" className="col-form-label">Email</label> 
                               <InputLayout name="email"  type="text" value={order?.email}/>
                        </div>

                        <div className="form-group col-6 ">
                               <label htmlFor="text" className="col-form-label">Phone</label> 
                               <InputLayout name="phone_number"  type="text" value={order?.phone_number}/>

                        </div>
                        <div className="form-group col-12 ">
                               <label htmlFor="text" className="col-form-label">Address</label> 
                               <InputLayout name="address"  type="text" value={order?.address}/>

                        </div>

                        <div className="form-group col-12 ">
                               <SelectInputBase nameObject="status" label="Status" initialValue={order?.status} getData={StatusArr}/>

                        </div>
                    

                        <div className="row">
                            <div className="col-12">
                            <button onClick={()=>handleCancel()} className="btn btn-border mr-3">Cancel</button>
                                <button name="submit" type="submit" className="btn btn-primary btn-admin">Update</button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default UpdateOrderForm
