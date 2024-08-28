import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from '../customer/components/Navigation/Navigation'
import HomePage from '../customer/pages/HomePage'
import Footer from '../customer/components/Footer/Footer'
import ProductDetail from '../customer/components/ProductDetail/ProductDetail'
import ScrollToTop from '../customer/components/ScrollToTop/ScrollToTop'
import ShopProduct from '../customer/components/ShopProduct/ShopProduct'
import Cart from '../customer/components/Cart/Cart'
import Checkout from '../customer/components/Checkout/Checkout'
import ProfileDetail from '../customer/components/ProfileDetail/ProfileDetail'
import OrderDetail from '../customer/components/OrderDetail/OrderDetail'
import Contact from '../customer/components/Contact/Contact'

const CustomerRouter = () => {
  return (
    <div>
    <Navigation/>
    <ScrollToTop/>
    <Routes>
    <Route path='/login' element={<HomePage/>}></Route>
    <Route path='/register' element={<HomePage/>}></Route>
    <Route path='/' element={<HomePage/>}></Route>
    <Route path='/shop' element={<ShopProduct/>}></Route>
    <Route path='/product/:productId' element={<ProductDetail/>}></Route>
    <Route path='/cart' element={<Cart/>}></Route>
    <Route path='/checkout' element={<Checkout/>}></Route>
    <Route path='/checkout/payment/:idOrder' element={<Checkout/>}></Route>
    <Route path='/account' element={<ProfileDetail/>}></Route>
    <Route path='/account/orders/:orderId' element={<OrderDetail/>}></Route>
    <Route path='/contact' element={<Contact/>}></Route>
    </Routes>
    <div>
    <Footer/>
    </div>
</div>
  )
}

export default CustomerRouter
