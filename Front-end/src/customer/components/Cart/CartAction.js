export const addToCart = (product) => {
    let cart = localStorage.getItem('cart');
    if (cart) {
        cart = JSON.parse(cart);
    } else {
        cart = [];
    }

    const existingProductIndex = cart.findIndex(
        (item) =>
            item.product_id === product.product_id &&
            item.color === product.color &&
            item.size === product.size
    );

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
};


export const getCart  =  () => {
    let cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(cart);
    } else {
        return [];
    }
}


export const calculateTotalPrice = (cart, products) => {
    let totalPrice = 0;
  
    cart.forEach(cartItem => {
      // Tìm sản phẩm trong danh sách products với điều kiện product_id
      const product = products.find(product => 
        product.id === cartItem.product_id
      );
  
      if (product) {
        // Tính tổng tiền cho từng sản phẩm
        totalPrice += cartItem.quantity * product.price;
      }
    });
  
    return totalPrice;
  };


  export const calculateTotal = (cart, products) => {
    let totalPrice = 0;
  
    cart.forEach(cartItem => {
      // Tìm sản phẩm trong danh sách products với điều kiện product_id
      const product = products.find(product => 
        product.id === cartItem.product_id
      );
  
      if (product) {
        // Tính tổng tiền cho từng sản phẩm
        totalPrice += cartItem.quantity * (product.price * (100-product.discount)/100).toFixed(1);
      }
    });
  
    return totalPrice;
  };