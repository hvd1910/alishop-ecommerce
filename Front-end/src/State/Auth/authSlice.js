
import {  createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: null, 
    reducers: {
        addUserAdmin(state, action) {
            return action.payload
        },
        removeUserAdmin(state, action) {
            return null
        },
    },
    
})

const {actions, reducer} = authSlice
export const GetUserAdmin = (state) => state.userAdmin
export const { addUserAdmin, removeUserAdmin} = actions
export default reducer


