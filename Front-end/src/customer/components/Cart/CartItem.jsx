import React, { useEffect, useState } from "react";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Button, IconButton } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { API_BASE_URL } from "../../../config/apiConfig";
import { ToastSuccess } from "../../../admin/components/BodyMain/notification/Notification";

const CartItem = ({ item, products , onLoad}) => {
  const [cart, setCart] = useState([]);
  const [onRemove, setOnRemove] = useState(false)

 

  const handleUpdateCartItem = (num) => {
    onLoad()
    const updatedCart = cart.map(cartItem => {
      if (
        cartItem.product_id === item.product_id &&
        cartItem.color === item.color &&
        cartItem.size === item.size
      ) {
        return {
          ...cartItem,
          quantity: cartItem.quantity + num
        };
      }
            return cartItem;
      
    });

    setCart(updatedCart); // Cập nhật state giỏ hàng
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Lưu vào localStorage
  };

  const filteredProduct = products.find(product => product.id === item.product_id);

  const matchingProduct = filteredProduct?.product_details.find(
    (productdetail) =>
      productdetail.color === item.color &&
      productdetail.size === item.size
  );

  const isDisabled = matchingProduct
        ? item.quantity <= 1
        : item.quantity <= 1;



  const handleRemoveCartItem = () => {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const index = cartItems.findIndex(cartItem =>
      cartItem.product_id === item.product_id &&
      cartItem.color === item.color &&
      cartItem.size === item.size
    );
  
    if (index !== -1) {
      // Loại bỏ sản phẩm khỏi mảng cartItems
      cartItems.splice(index, 1);
      // Cập nhật lại localStorage
      localStorage.setItem('cart', JSON.stringify(cartItems));
    ToastSuccess("Remove product from cart successfully.")
    setOnRemove(!onRemove)
    onLoad()
    }
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
  }, [onLoad]);

  return (
    <div className="pl-5 pr-5 pt-3 pb-3 border-2 rounded-lg mb-2" >
      <div className="flex items-center">
        <div className="w-[5rem] h-[rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={`${API_BASE_URL}products/images/${filteredProduct?.product_images[0].image_url}`}
            alt=""
          />
        </div>

        <div className="ml-5 space-y-1">
          <p className="font-semibold">{filteredProduct?.name}</p>
          <p className="opacity-70">Size: {item?.size}, {item.color}</p>
          <div className="flex space-x-5 items-center text-gray-900 pt-6">
            <p className="font-semibold">${(filteredProduct?.price * (100-filteredProduct?.discount)/100).toFixed(1)}</p>
            <p className="opacity-50 line-through"> ${filteredProduct?.price}</p>
            <p className="text-green-500 font-semibold">{filteredProduct?.discount}% Off</p>
          </div>
        </div>
      </div>

      <div className="lg:flex items-center lg:space-x-10 pt-2">
        <div className="flex items-center space-x-2">
          <IconButton onClick={() => handleUpdateCartItem(-1)} disabled={isDisabled}>
            <RemoveCircleOutlineIcon/>
          </IconButton>
          <span className="py-1 px-7 border rounded-sm">{item?.quantity}</span>
          <IconButton onClick={() => handleUpdateCartItem(1)} disabled={matchingProduct?.qty === item?.quantity}>
            <AddCircleOutlineIcon/>
          </IconButton>
        </div>

        <div>
          <Button onClick={handleRemoveCartItem}>Remove</Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
