import axios from "axios"

export const API_BASE_URL =  "http://localhost:8088/api/v1/"


const jwt = localStorage.getItem("jwt")
const jwtAdmin = localStorage.getItem("jwtAdmin")


export const apiAdmin = axios.create({
    baseURL: API_BASE_URL,
    headers:{
        "Authorization":`Bearer ${jwtAdmin}`,
        'Content-Type':"application/json"
    }
})

export const apiUser = axios.create({
    baseURL: API_BASE_URL,
    headers:{
        "Authorization":`Bearer ${jwt}`,
        'Content-Type':"application/json"
    }
})