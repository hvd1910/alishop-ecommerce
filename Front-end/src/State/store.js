

import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../State/Auth/authSlice'
import authCustomerSlice from '../State/Auth/authCustomerSlice'
import cartSlice from '../State/Auth/cartSlice'
export const store = configureStore({
    reducer: {
        userAdmin: authSlice,
        user: authCustomerSlice,
        cart: cartSlice
    },
})
