import React, { Fragment, useState } from 'react'
import { useNavigate } from "react-router-dom";


const SideBar = () => {
	const [openItemMenu, setOpenItemMenu] = useState(null) 
	const navigate = useNavigate();


	
	const handleOpenItemMenu =  (index) => {
    if(index === openItemMenu) {
		setOpenItemMenu(null)
	}else{
		setOpenItemMenu(index)
	}
  }

  return (
    <Fragment>
      	{/* <!-- LEFT MAIN SIDEBAR --> */}
		<div className="ec-left-sidebar ec-bg-sidebar">
			<div id="sidebar" className="sidebar ec-sidebar-footer">

				<div className="ec-brand">
					<a  onClick={()=> navigate('/admin')}>
						<img className="ec-brand-icon" src="assets/img/logo/favicon.png" alt="" />
						<span className="ec-brand-name text-truncate">ALISHOP</span>
					</a>
				</div>

				{/* <!-- begin sidebar scrollbar --> */}
				<div className="ec-navigation" data-simplebar>
					{/* <!-- sidebar menu --> */}
					<ul className="nav sidebar-inner" id="sidebar-menu">
						{/* <!-- Dashboard --> */}
						<li className="active">
							<a className="sidenav-item-link" onClick={()=> navigate('/admin')}>
								<i className="mdi mdi-view-dashboard-outline"></i>
								<span className="nav-text">Dashboard</span>
							</a>
							<hr/>
						</li>

						

						{/* <!-- Users --> */}
						<li className={`has-sub ${openItemMenu===0 ? 'expand':''}`} onClick={()=>handleOpenItemMenu(0)}>
							<a className="sidenav-item-link" >
								<i className="mdi mdi-account-multiple-outline"></i>
								<span className="nav-text">Customers</span> <b className="caret"></b>
							</a>
							<div className="collapse" style={{display: openItemMenu===0 ? 'block': 'none'}}>
								<ul className="sub-menu" id="users" data-parent="#sidebar-menu">
									

									<li className="">
										<a className="sidenav-item-link" onClick={()=>navigate("/admin/users")}>
											<span className="nav-text">User List</span>
										</a>
									</li>
								
								</ul>
							</div>
							<hr/>
						</li>

						{/* <!-- Category --> */}
						<li className={`has-sub ${openItemMenu===1 ? 'expand':''}`} onClick={()=>handleOpenItemMenu(1)}>
							<a className="sidenav-item-link" >
								<i className="mdi mdi-shape"></i>
								<span className="nav-text">Categories</span> <b className="caret"></b>
							</a>
							<div className="collapse"  style={{display: openItemMenu===1 ? 'block': 'none'}}>
								<ul className="sub-menu" id="categorys" data-parent="#sidebar-menu">
									<li className="">
										<a className="sidenav-item-link" onClick={()=>navigate("/admin/categories")}>
											<span className="nav-text">All Category</span>
										</a>
									</li>
									
								</ul>
							</div>
						</li>

						{/* <!-- Products --> */}
						<li className={`has-sub ${openItemMenu===2 ? 'expand':''}`} onClick={()=>handleOpenItemMenu(2)}>
							<a className="sidenav-item-link" >
								 <i className="mdi mdi-palette-advanced"></i> 
								<i className="mdi mdi-package-variant-closed"></i>
								<span className="nav-text">Products</span> <b className="caret"></b>
							</a>
							<div className="collapse"  style={{display: openItemMenu===2 ? 'block': 'none'}}>
								<ul className="sub-menu" id="products" data-parent="#sidebar-menu">
									
									<li className=""  onClick={()=>navigate("/admin/products")}>
										<a className="sidenav-item-link" >
											<span className="nav-text">List Product</span>
										</a>
									</li>
									
									
								</ul>
							</div>
						</li>

						{/* <!-- Orders --> */}
						<li className={`has-sub ${openItemMenu===3 ? 'expand':''}`} onClick={()=>handleOpenItemMenu(3)}>
							<a className="sidenav-item-link" >
								<i className="mdi mdi-cart-outline"></i>
								<span className="nav-text">Orders</span> <b className="caret"></b>
							</a>
							<div className="collapse"  style={{display: openItemMenu===3 ? 'block': 'none'}}>
								<ul className="sub-menu" id="orders" data-parent="#sidebar-menu">
									<li className="">
										<a className="sidenav-item-link" onClick={()=> navigate('/admin/orders')}>
											<span className="nav-text">List Orders</span>
										</a>
										<a className="sidenav-item-link" onClick={()=> navigate('/admin/orders/rejected')}>
											<span className="nav-text">List Orders Rejected</span>
										</a>
									</li>
								
									
								</ul>
							</div>
						</li>


						<li className={`has-sub ${openItemMenu===6 ? 'expand':''}`} onClick={()=>handleOpenItemMenu(6)}>
							<a className="sidenav-item-link" href="javascript:void(0)">
							<i className="mdi mdi-tag-outline"></i>
							<span className="nav-text">Coupons</span> <b className="caret"></b>
							</a>
							<div className="collapse"  style={{display: openItemMenu===6 ? 'block': 'none'}}>
								<ul className="sub-menu" id="authentication" data-parent="#sidebar-menu">
									<li className="">
									<a className="sidenav-item-link" onClick={()=> navigate('/admin/coupons')}>
									<span className="nav-text">List Coupons </span>
										</a>
									</li>
								
								</ul>
							</div>
						</li>

						<li className={`has-sub ${openItemMenu===5 ? 'expand':''}`} onClick={()=>handleOpenItemMenu(5)}>
							<a className="sidenav-item-link" href="javascript:void(0)">
								<i className="mdi mdi-receipt"></i>
								<span className="nav-text">Contacts</span> <b className="caret"></b>
							</a>
							<div className="collapse"  style={{display: openItemMenu===5 ? 'block': 'none'}}>
								<ul className="sub-menu" id="authentication" data-parent="#sidebar-menu">
									<li className="">
									<a className="sidenav-item-link" onClick={()=> navigate('/admin/contacts')}>
									<span className="nav-text">List Contacts </span>
										</a>
									</li>
								
								</ul>
							</div>
						</li>
					
				
						 {/* Setting  */}
						{/* <li>
							<a className="sidenav-item-link" href="setting.html">
								<i className="mdi mdi-cogs"></i>
								<span className="nav-text">Setting</span>
							</a>
						</li>
						 Authentication  */}
					

					
					</ul>
				</div>
			</div>
		</div>
    </Fragment>
  )
}

export default SideBar
