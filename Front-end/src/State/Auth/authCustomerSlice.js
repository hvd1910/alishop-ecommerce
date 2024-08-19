
import {  createSlice } from "@reduxjs/toolkit";


const authCustomerSlice = createSlice({
    name: 'authCustomer',
    initialState: null, 
    reducers: {
        addUser(state, action) {
            return action.payload
        },
        removeUser(state, action) {
            return null
        },
    },
    
})

const {actions, reducer} = authCustomerSlice
export const GetUser = (state) => state.user
export const { addUser, removeUser} = actions
export default reducer


