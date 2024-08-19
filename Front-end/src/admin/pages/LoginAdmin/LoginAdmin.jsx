import React, { useEffect, useState } from 'react'
import LoginAdminForm from '../../components/LoginAdminForm/LoginAdminForm';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetUserAdmin } from '../../../State/Auth/authSlice';
const LoginAdmin = () => {
	const userAdmin = useSelector(GetUserAdmin)
	const navigate = useNavigate();

	
    useEffect(() => {
        if (userAdmin?.role.id === 2) {
            navigate("/admin") 
        }
    }, [userAdmin, navigate]);
  
  return (
    <div className="sign-inup" id="body">
		<div className="container">
			<div className="row g-0"> 
				<div className="col-lg-10 offset-lg-1">
					<div className="row g-0">
						<div className="col-lg-6">
							<div className="login_area_left_wrapper">
								<div className="login_logo_area">
									<img src={""} alt=""/>
									
								</div>
							</div>
						</div>
					<LoginAdminForm/>


					</div>
				</div>
			</div>
		</div>
	
	</div>
  )
}

export default LoginAdmin
