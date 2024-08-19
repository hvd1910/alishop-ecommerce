import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { calculateTotal, calculateTotalPrice, getCart } from "./CartAction";
import CartItem from "./CartItem";
import All_API from "../../../State/Auth/All_API";
import { ToastError } from "../../../admin/components/BodyMain/notification/Notification";
import cartEmpty from "../../../assets/images/cartEmpty.jpg";
import { useDispatch } from "react-redux";
import { addCart } from "../../../State/Auth/cartSlice";
const Cart = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch(); 

  const cart = getCart();

  const onLoad = () => {
    setLoad(!load);
  };
 

 // Tính tổng tiền từ giỏ hàng và danh sách sản phẩm
 const totalCartPrice = calculateTotalPrice(cart, products);

 const totalAmount = calculateTotal(cart, products).toFixed(1);

 const totalDiscount = (totalCartPrice - totalAmount).toFixed(1);

 const handleCheckout = () => {
    const cartData = {
      carts: cart,
      products: products,
      totalCartPrice: totalCartPrice,
      totalAmount: totalAmount,
      totalDiscount: totalDiscount
    }
    dispatch(addCart(cartData))
   navigate("/checkout?step=1");
 };

 async function getProductById(productIds) {
  try {
    const response = await All_API.getProductsCart(productIds);
    if (response.data.status === "success") {
      setProducts(response.data.data);
    } else {
      ToastError(response.data.status);
      navigate("/");
    }
  } catch {
    ToastError("please try again");
    navigate("/");
  }
}
  useEffect(() => {
    if (cart.length > 0) {
      const productIds = cart.map((item) => item.product_id).join(",");
      getProductById(productIds);
    }
  }, [load]);

 
  return (
    <div>
      {cart.length > 0 ? (
        <div className="lg:grid grid-cols-3 sm:px-6 lg:px-20  relative mt-4 ml-16 mr-16 ">
          <div className="col-span-2">
            {cart.length > 0 &&
              cart?.map((item) => (
                <CartItem item={item} products={products} onLoad={onLoad} />
              ))}
          </div>

          <div className="sticky top-[30px] h-[100vh] lg:mt-0">
            <div
              className=" pt-5 px-5 ml-4 rounded-lg"
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
                  <span className="text-gray-700">${totalCartPrice}</span>
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
                  <span className="text-gray-700">Free</span>
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
                onClick={handleCheckout}
                variant="contained"
                className="w-full mt-2 mb-4 hover:hover:bg-black"
                sx={{ px: "2.5rem", py: "0.7rem", bgcolor: "#5B93FF" }}
              >
                Check out
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full pt-6 pb-9">
          <img
            src={cartEmpty}
            alt=""
            style={{ width: "200px", objectFit: "cover" }}
          />
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
          <Link
            to="/shop"
            className="mt-3 bg-gray-800 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
