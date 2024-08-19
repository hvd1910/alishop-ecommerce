import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import All_API from '../../../State/Auth/All_API';
import { ToastError, ToastSuccess } from '../BodyMain/notification/Notification';

const LoginAdminForm = () => {
    const navigate = useNavigate();
    
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const data = new FormData(event.currentTarget);
      const userData = {
        phone_number: data.get("phone_number"),
        password: data.get("password"),
        role_id: 2
      };
      loginAdmin(userData)
    }
      async function loginAdmin(userData) {
        try{
          const data = await All_API.loginAPI(userData)
            if(data.data.token) {
                localStorage.setItem("jwtAdmin", data.data.token)
                ToastSuccess("Login in successfully.")
                navigate('/admin')
            }
            else {
              ToastError("Please try again.")
            }
        }catch {
          ToastError("Please try again.")
        }
      }
    
      
    
    
      
      

  return (
    <div className="col-lg-6">
    <div className="login_area_right_wrapper">
        <div className="login_area_right_heading">
            <h4>Welcome Back!</h4>
            <p>Sign in to continue to <a href="#!">ALISHOP</a></p>
        </div>
        <div className="login_form_wrapper">
            <form  onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Phone number</label>
                    <input type="text" className="form-control" name='phone_number' placeholder="Enter phone number"/>
                </div>
                <div className="form-group ">
                    <label>Password</label>
                    <input type="password" name='password' className="form-control" placeholder="Enter password"/>
                </div>
                <div className="login_form_forget">
                    <a href="#">Forgot password?</a>
                </div>
                <div className="login_form_bottm_area">
                    <button type="submit" className="btn btn-primary w-100">Sign in</button>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default LoginAdminForm
