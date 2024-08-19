import React, { Fragment, useState } from 'react'
import { GetUserAdmin, removeUserAdmin } from '../../../State/Auth/authSlice';
import {  useDispatch, useSelector } from 'react-redux';
import  AvatarAdmin from '../../../assets/images/avatar-1.jpg'
import {useNavigate } from "react-router-dom";



const Header = () => {
  const [openNotif, setOpenNotif] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const userAdmin = useSelector(GetUserAdmin)
  const navigate = useNavigate();
  const dispatch = useDispatch()



  const handleNotif = () => {
    setOpenUserMenu(false)
    setOpenNotif(!openNotif)
  }
  const handlUserMenu = () => {
      setOpenNotif(false)
      setOpenUserMenu(!openUserMenu)
  }


  const handleLogout= () => {
	localStorage.removeItem("jwtAdmin")
	dispatch(removeUserAdmin(null))
	navigate('/admin/login')
  }

  
 


  return (
    <Fragment>
  {/* <!-- Header --> */}
			<header className="ec-main-header" id="header">
				<nav className="navbar navbar-static-top navbar-expand-lg">
					{/* <!-- Sidebar toggle button --> */}
					<button id="sidebar-toggler">
						<img src="assets/img/icons/clops.png" alt=""/>
					</button>
					{/* <!-- search form --> */}
					<div className="search-form d-lg-inline-block">
						<div className="input-group">
							<input type="text" name="query" id="search-input" className="form-control-2"
								placeholder="search.." autoFocus autoComplete="off" />
							<button type="button" name="search" id="search-btn" className="btn btn-flat">
								<i className="mdi mdi-magnify"></i>
							</button>
						</div>
						<div id="search-results-container">
							<ul id="search-results"></ul>
						</div>
					</div>

					{/* <!-- navbar right --> */}
					<div className="navbar-right">
						<ul className="nav navbar-nav">
							{/* <!-- User Account --> */}
							<li className="dropdown user-menu" onClick={()=> handlUserMenu()}>
								<button className="dropdown-toggle nav-link ec-drop" data-bs-toggle="dropdown"
									aria-expanded="false">
									<img src={AvatarAdmin} className="user-image" alt="User Image" />
								</button>
								{ openUserMenu && (
                  <ul className="dropdown-menu dropdown-menu-right ec-dropdown-menu ">
									{/* <!-- User image --> */}
									<li className="dropdown-header">
										<div className="d-inline-block">
											<h5>{userAdmin?.fullname}</h5>
											<p className="pt-2">{userAdmin?.email}</p>
										</div>
									</li>
									<li >
										<a onClick={()=> navigate('/profile')}>
											<i className="mdi mdi-account"></i> My Profile
										</a>
									</li>
									<li className="dropdown-footer">
										<a onClick={()=> handleLogout()}> <i className="mdi mdi-logout"></i> Log Out </a>
									</li>
								</ul>
                )}
							</li>
              
							<li className="dropdown notifications-menu custom-dropdown" onClick={()=> handleNotif()}>
								<button className="dropdown-toggle notify-toggler custom-dropdown-toggler">
									<i className="mdi mdi-bell-ring-outline"></i>
                  
								</button>
               { openNotif && ( <div className="card card-default dropdown-notify dropdown-menu-right mb-0">
									<div className="card-header card-header-border-bottom px-3">
										<h2>Notifications</h2>
									</div>

									<div className="card-body px-0 py-0">
										<div className="tab-content" id="myNotifications">
											<ul className="list-unstyled" data-simplebar style={{height: "360px"}}>
												<li>
													<a 
														className="media media-message media-notification">
														<div className="position-relative mr-3">
															<img className="rounded-circle" src="assets/img/user/u2.jpg"
																alt="Image"/>
															<span className="status away"></span>
														</div>
														<div className="media-body d-flex justify-content-between">
															<div className="message-contents">
																<h4 className="title">Nitin</h4>
																<p className="last-msg">Lorem ipsum dolor sit, amet
																	consectetur adipisicing elit. Nam itaque
																	doloremque odio, eligendi delectus vitae.</p>

																<span
																	className="font-size-12 font-weight-medium text-secondary">
																	<i className="mdi mdi-clock-outline"></i> 30 min
																	ago...
																</span>
															</div>
														</div>
													</a>
												</li>

												<li>
													<a 
														className="media media-message media-notification media-active">
														<div className="position-relative mr-3">
															<img className="rounded-circle" src="assets/img/user/u1.jpg"
																alt="Image"/>
															<span className="status active"></span>
														</div>
														<div className="media-body d-flex justify-content-between">
															<div className="message-contents">
																<h4 className="title">Lovina</h4>
																<p className="last-msg">Donec mattis augue a nisl
																	consequat, nec imperdiet ex rutrum. Fusce et
																	vehicula enim. Sed in enim eu odio vehic.</p>

																<span
																	className="font-size-12 font-weight-medium text-white">
																	<i className="mdi mdi-clock-outline"></i> Just
																	now...
																</span>
															</div>
														</div>
													</a>
												</li>

												<li>
													<a 
														className="media media-message media-notification">
														<div className="position-relative mr-3">
															<img className="rounded-circle" src="assets/img/user/u5.jpg"
																alt="Image"/>
															<span className="status away"></span>
														</div>
														<div className="media-body d-flex justify-content-between">
															<div className="message-contents">
																<h4 className="title">Crinali</h4>
																<p className="last-msg">Lorem ipsum dolor sit, amet
																	consectetur adipisicing elit. Nam itaque
																	doloremque odio, eligendi delectus vitae.</p>

																<span
																	className="font-size-12 font-weight-medium text-secondary">
																	<i className="mdi mdi-clock-outline"></i> 1 hrs
																	ago...
																</span>
															</div>
														</div>
													</a>
												</li>
												<li>
													<a 
														className="media media-message media-notification">
														<div className="position-relative mr-3">
															<img className="rounded-circle" src="assets/img/user/u4.jpg"
																alt="Image"/>
															<span className="status away"></span>
														</div>
														<div className="media-body d-flex justify-content-between">
															<div className="message-contents">
																<h4 className="title">Crinali</h4>
																<p className="last-msg">Lorem ipsum dolor sit, amet
																	consectetur adipisicing elit. Nam itaque
																	doloremque odio, eligendi delectus vitae.</p>

																<span
																	className="font-size-12 font-weight-medium text-secondary">
																	<i className="mdi mdi-clock-outline"></i> 1 hrs
																	ago...
																</span>
															</div>
														</div>
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>)}

                
								<ul className="dropdown-menu dropdown-menu-right d-none">
									<li className="dropdown-header">You have 5 notifications</li>
									<li>
										<a href="#">
											<i className="mdi mdi-account-plus"></i> New user registered
											<span className=" font-size-12 d-inline-block float-right"><i
													className="mdi mdi-clock-outline"></i> 10 AM</span>
										</a>
									</li>
									<li>
										<a href="#">
											<i className="mdi mdi-account-remove"></i> User deleted
											<span className=" font-size-12 d-inline-block float-right"><i
													className="mdi mdi-clock-outline"></i> 07 AM</span>
										</a>
									</li>
									<li>
										<a href="#">
											<i className="mdi mdi-chart-areaspline"></i> Sales report is ready
											<span className=" font-size-12 d-inline-block float-right"><i
													className="mdi mdi-clock-outline"></i> 12 PM</span>
										</a>
									</li>
									<li>
										<a href="#">
											<i className="mdi mdi-account-supervisor"></i> New client
											<span className=" font-size-12 d-inline-block float-right"><i
													className="mdi mdi-clock-outline"></i> 10 AM</span>
										</a>
									</li>
									<li>
										<a href="#">
											<i className="mdi mdi-server-network-off"></i> Server overloaded
											<span className=" font-size-12 d-inline-block float-right"><i
													className="mdi mdi-clock-outline"></i> 05 AM</span>
										</a>
									</li>
									<li className="dropdown-footer">
										<a className="text-center" href="#"> View All </a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</nav>
			</header>

    </Fragment>
  )
}

export default Header
