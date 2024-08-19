
import {  createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: null, 
    reducers: {
        addCart(state, action) {
            return action.payload
        },
        removeCart(state, action) {
            return null
        },
    },
    
})

const {actions, reducer} = cartSlice
export const GetCart = (state) => state.cart
export const { addCart, removeCart} = actions
export default reducer


