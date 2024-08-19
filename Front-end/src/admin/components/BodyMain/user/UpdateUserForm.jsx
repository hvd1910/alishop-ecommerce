import React, { useEffect, useState } from 'react'
import { convertDateFormat, formatDatePut } from '../Convert/Convert'
import { ToastError, ToastSuccess } from '../notification/Notification'
import All_API from '../../../../State/Auth/All_API'
import InputLayout from '../../Input/InputLayout'
import SelectValueIdLayout from '../../Input/SelectValueIdLayout'
import SelectActiveLayout from '../../Input/SelectActiveLayout'

const UpdateUserForm = ({idObject, handleCancel, onUpdate}) => {
    const [user, setUser] = useState()
    const [roles, setRoles] = useState([])
  
   

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
            address: data.get("address"),
            facebook_account_id: user.facebook_account_id,
            google_account_id: user.google_account_id,
            role_id: data.get("role_id"),
            active: data.get("active") === "true",
        }
        if(userData.password === userData.retype_password) {
            updateUser(idObject, userData)
           }else{
            ToastError("Passwords do not match.")
           }          


           async function updateUser(id, userData) {
            try{
              const response = await All_API.updateUserById(id, userData)
              console.log(response)
              if(response.data.status === "success") {
                ToastSuccess(response.data.message)
                onUpdate()
                handleCancel()
              }else {
                ToastError(response.data.message)
              }
            }catch (error){
              ToastError(error.response.data.message);
            }
            
          }
        }


    async function getUserById() {
		try{
		  const response = await All_API.getUserById(idObject)
		  setUser(response.data.data)
		}catch {
			ToastError("Please try again")
			handleCancel()
		}
	  }
    
    async function getRoleAll() {
        try{
          const response = await All_API.getRoleAll()
          setRoles(response.data)
            }catch {
          
        }
    }
	
	  useEffect(()=> {
		getUserById()
        getRoleAll()
	  }, [])


  return (
    <div className="tab-widget mt-10 bg-white rounded-2xl">
    <div className="user_profile_top_heading pl-4 pr-4 pt-2 " style={{marginBottom:"10px"}}>
      <h3 className="pt-2">Update User </h3>
    </div>
    <div className="tab-pane-content  pl-4 pr-4" >
      <form onSubmit={handleSubmit}>
        <div className="row mb-1">
          <div className="col-lg-6">
            <div className="form-group input-profile input-profile">
              <label htmlFor="fullname" className="col-form-label">
                Full Name
              </label>
              <InputLayout className="" name="fullname"  type="text" value={user?.fullname}/>

            </div>
          </div>

          <div className="col-lg-6">
            <div className="form-group input-profile">
              <label htmlFor="phone_number">Phone</label>
              <InputLayout className="" name="phone_number"  type="text" value={user?.phone_number}/>

            </div>
          </div>

          <div className="col-lg-6">
            <div className="form-group input-profile mb-1">
              <label htmlFor="email">Email</label>
              <InputLayout name="email"  type="email" value={user?.email}/>

            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group input-profile mb-1">
              <label htmlFor="date_of_birth">Birthday</label>
              <InputLayout name="date_of_birth"  type="date" value={convertDateFormat(user?.date_of_birth)}/>

            </div>
          </div>

          <div className="col-lg-12">
            <div className="form-group input-profile mb-1">
              <label htmlFor="address">Address</label>
              <InputLayout name="address"  type="text" value={user?.address}/>

            </div>
          </div>

          <div className="col-lg-6">
            <div className="form-group input-profile mb-1">
              <SelectValueIdLayout nameObject="role_id" label="Role"  getData={roles} initialValue={user?.role.id}/>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="form-group input-profile mb-1">
             <SelectActiveLayout nameObject="active" label="Active"  initialValue={user?.is_active}/>
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
                
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-5 pb-3">
          <button type="submit" className="btn btn-primary mb-2 btn-pill">
            Update User
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default UpdateUserForm
