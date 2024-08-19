import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "../admin/components/GlobalStyleAdmin/GlobalStyleAdmin.scss";
import "../admin/components/GlobalStyleAdmin/materialdesignicons.min.scss";
import "../admin/components/GlobalStyleAdmin/responsive.datatables.min.scss";
import "../admin/components/GlobalStyleAdmin/datatables.bootstrap5.min.scss";

import HomePage from "../admin/pages/HomePage/HomePage";
import SideBar from "../admin/components/SideBar/SideBar";
import Header from "../admin/components/HeaderAdmin/HeaderAdmin";
import Footer from "../admin/components/FooterAdmin/FooterAdmin";
import UserList from "../admin/pages/UserAdmin/UserList";
import AddUser from "../admin/pages/UserAdmin/AddUser";
import UserView from "../admin/pages/UserAdmin/UserView";
import CategoryList from "../admin/pages/CategoryAdmin/CategoryList";
import ProductList from "../admin/pages/ProductAdmin/ProductList";
import LoginAdmin from "../admin/pages/LoginAdmin/LoginAdmin";
import { useDispatch,  } from "react-redux";
import { addUserAdmin } from "../State/Auth/authSlice";
import All_API from "../State/Auth/All_API";
import UpdateProduct from "../admin/pages/ProductAdmin/UpdateProduct";
import ViewProduct from "../admin/pages/ProductAdmin/ViewProduct";
import OrderList from "../admin/pages/OrderAdmin/OrderList";
import ViewOrder from "../admin/pages/OrderAdmin/ViewOrder";
import OrderListReject from "../admin/pages/OrderAdmin/OrderListReject";
import { ToastSuccess } from "../admin/components/BodyMain/notification/Notification";
import ContactList from "../admin/pages/ContactAdmin/ContactList";

const AdminRouter = () => {
  const jwt = localStorage.getItem("jwtAdmin");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userLoaded, setUserLoaded] = useState(false); 


  async function getUser(token) {
    try{
      const data = await All_API.getUserAPI(token)
      dispatch(addUserAdmin(data.data.data))
      if(data.data?.data.role.id === 2) {
        setUserLoaded(false)
      }else {
        setUserLoaded(true)
      }
    }catch {
      setUserLoaded(true)
    } 
  }

  useEffect(() => {

    getUser(jwt);
    if (userLoaded) {
      navigate('/admin/login');
    }
  }, [jwt, userLoaded]);
  
  




  return (
    <Routes>
     <Route path="/login" element={<LoginAdmin />} />

      <Route
        path="*"
        element={
          <>
            <div className="ec-header-fixed ec-sidebar-fixed ec-sidebar-light ec-header-light">
              <div className="wrapper">
                <SideBar />
                <div className="ec-page-wrapper">
                  <Header />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/add" element={<AddUser />} />
                    <Route
                      path="/users/detail"
                      element={<UserView />}
                    />
                    <Route path="/categories" element={<CategoryList />} />
                    <Route path="/products" element={<ProductList />} />

                    <Route path="/products/edit/:productId" element={<UpdateProduct />} />
                    <Route path="/products/:productId" element={<ViewProduct />} />

                    <Route path="/orders" element={<OrderList />} />
                    <Route path="/orders/rejected" element={<OrderListReject />} />
                    <Route path="/orders/:orderId" element={<ViewOrder />} />
                    <Route path='/contacts' element={<ContactList/>}></Route>

                  </Routes>
                  <Footer />
                </div>
              </div>
            </div>
          </>
        }
      />
    </Routes>
  );
};

export default AdminRouter;
