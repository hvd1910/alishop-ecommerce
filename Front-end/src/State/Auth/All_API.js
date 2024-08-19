import axios from "axios";
import { API_BASE_URL, apiAdmin, apiUser } from "../../config/apiConfig";




  const All_API = {
    loginAPI:  (userData) => {
        const response =  axios.post(`${API_BASE_URL}users/login`, userData);
    return response;
    
    },
    registerAPI: (userData) => {
        const response =  axios.post(`${API_BASE_URL}users/register`, userData);
        return response;
    },
     getUserAPI:   (token) => {
        const response =  axios.get(`${API_BASE_URL}users/details`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response;

    },


    
    getAllUsers:   (data) => {
        const {
            page,
            limit,
            keyword
          } = data;
        const response =  apiAdmin.get(`${API_BASE_URL}users?page=${page}&limit=${limit}&keyword=${keyword}`);
        return response;
    },

    getUserById: (userId) => {
        const response =  apiAdmin.get(`${API_BASE_URL}users/get-by-id/${userId}`);
        return response;
    },

    updateUserById: (userId, userData) => {
        const response =  apiAdmin.put(`${API_BASE_URL}users/update-by-id/${userId}`, userData);
        return response;
    },


    deleteUserById: (userId) => {
        const response =  apiAdmin.delete(`${API_BASE_URL}users/${userId}`);
        return response;
    },


    getRoleAll: () => {
        const response =  axios.get(`${API_BASE_URL}roles`);
        return response;
    },


    getAllCategory:   () => {
        const response =  axios.get(`${API_BASE_URL}categories`);
        return response;
    },
    getCategoryById:   (id) => {
        const response =  axios.get(`${API_BASE_URL}categories/${id}`);
        return response;
    },
    createCategory: (categoryData) => {
        const response =  apiAdmin.post("/categories", categoryData)
        return response;
    },

    updateCategory: (id, categoryData ) => {
        const response =  apiAdmin.put(`/categories/${id}`, categoryData)
        return response;
    },
    
    deleteCategory: (id) => {
        const response =  apiAdmin.delete(`/categories/${id}`)
        return response;
    },

    
    getAllProducts:   (data) => {
        const {
            colors,
            sizes,
            minPrice,
            maxPrice,
            minDiscount,
            categoryId,
            sort,
            page,
            limit,
            keyword
          } = data;
        const response =  axios.get(`${API_BASE_URL}products?page=${page}&limit=${limit}&categoryId=${categoryId}&color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&keyword=${keyword}&sort=${sort}`);
        return response;
    },
    getAllProductsAdmin:   (data) => {
        const {
            categoryId,
            sort,
            page,
            limit,
            keyword
          } = data;
        const response =  axios.get(`${API_BASE_URL}products/admin?page=${page}&limit=${limit}&categoryId=${categoryId}&keyword=${keyword}&sort=${sort}`);
        return response;
    },
    getProductById:   (id) => {
        const response =  axios.get(`${API_BASE_URL}products/${id}`);
        return response;
    },
    createProduct: (productData)=> {
        const response =  apiAdmin.post("/products", productData)
        return response;
    },
    updateProduct: (id, productData)=> {
        const response =  apiAdmin.put(`/products/${id}`, productData)
        return response;
    },

    deleteProduct: (id)=> {
        const response =  apiAdmin.delete(`/products/${id}`)
        return response;
    },

    addImageProduct:   (idProduct,token, imageData) => {
        const response =  axios.post(`${API_BASE_URL}products/uploads/${idProduct}`,imageData,  {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;

    },

    deleteImageProduct: (idImage) => {
        const response =  apiAdmin.delete(`/product_images/${idImage}`)
        return response;
    },

    createProductDetail: (productId,productDetail)=> {
        const response =  apiAdmin.post(`/product_details/${productId}`, productDetail)
        return response;
    },
    getProductDetail: (productId)=> {
        const response =  apiAdmin.get(`/product_details/${productId}`)
        return response;
    },
    updateProductDetail: (id, productDetail)=> {
        const response =  apiAdmin.put(`/product_details/${id}`, productDetail)
        return response;
    },
    deleteProductDetail: (id, )=> {
        const response =  apiAdmin.delete(`/product_details/${id}`)
        return response;
    },



    getAllOrders:   (data) => {
        const {
            page,
            limit,
            status,
            keyword
          } = data;
        const response =  apiAdmin.get(`${API_BASE_URL}orders/get-orders-by-keyword?page=${page}&limit=${limit}&status=${status}&keyword=${keyword}`);
        return response;
    },

    getOrderDetail: (orderId)=> {
        const response =  apiAdmin.get(`/orders/${orderId}`)
        return response;
    },

    updateOrderStatus: (id, status)=> {
        const response =  apiAdmin.put(`/orders/status/${id}?status=${status}`)
        return response;
    },

    updateOrderInfo: (id, orderData)=> {
        const response =  apiAdmin.put(`/orders/${id}`, orderData)
        return response;
    },



    createReview: (review)=> {
        const response =  apiAdmin.post(`/comments`, review)
        return response;
    },



    getProductsCart: (listId)=> {
        const response =  axios.get(`${API_BASE_URL}products/by-ids?ids=${listId}`);
        return response;
    },


    createOrder: (orderData)=> {
        const response =  apiUser.post(`/orders`, orderData)
        return response;
    },


    getUrlBank: (orderId, total)=> {
        const amount = total * 24000;
        const response =  apiUser.get(`/payment/vn-pay?orderId=${orderId}&amount=${amount}&bankCode=NCB`)
        return response;
    },

    payOrderSuccess: (orderId, vnp_TransactionNo, vnp_ResponseCode)=> {
        const response =  apiUser.put(`/orders/payOrder/${orderId}?vnp_TransactionNo=${vnp_TransactionNo}&vnp_ResponseCode=${vnp_ResponseCode}`)
        return response;
    },
    

    payOrderSuccess: (orderId, vnp_TransactionNo, vnp_ResponseCode)=> {
        const response =  apiUser.put(`/orders/payOrder/${orderId}?vnp_TransactionNo=${vnp_TransactionNo}&vnp_ResponseCode=${vnp_ResponseCode}`)
        return response;
    },
    
    
    sentEmail:  (orderData) => {
        const response =  axios.post(`${API_BASE_URL}email`, orderData);
    return response;
    
    },

    getOrderByUserId:  (userId) => {
        const response =  apiUser.get(`${API_BASE_URL}orders/user/${userId}`);
    return response;
    
    },


    updateUser:  (userId, userData) => {
        const response =  apiUser.put(`${API_BASE_URL}users/details/${userId}`, userData);
    return response;
    
    },

    getOrderDetailByUser: (orderId)=> {
        const response =  apiUser.get(`${API_BASE_URL}orders/${orderId}`)
        return response;
    },


    sendContact: (messageData)=> {
        const response =  axios.post(`${API_BASE_URL}contacts`, messageData);
        return response;
    },

    getAllContact: (data)=> {
        const {
            page,
            limit,
            keyword,
            status
          } = data;
        const response =  apiAdmin.get(`${API_BASE_URL}contacts?page=${page}&limit=${limit}&keyword=${keyword}&status=${status}`);
        return response;
    },

    getContactById: (id) => {
        const response =  apiAdmin.get(`/contacts/${id}`)
        return response;
    },
    
    updateContact: (id, contactData ) => {
        const response =  apiAdmin.put(`/contacts/${id}`, contactData)
        return response;
    },

    deleteContact: (id ) => {
        const response =  apiAdmin.delete(`/contacts/${id}`)
        return response;
    },
   

   

}

export default All_API;