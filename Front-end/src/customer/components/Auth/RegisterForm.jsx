import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import All_API from "../../../State/Auth/All_API";
import { ToastError, ToastSuccess } from "../../../admin/components/BodyMain/notification/Notification";

const RegisterForm = () => {
    const navigate = useNavigate();




  const handleSubmit = (event) => {
    event.preventDefault()

    const data = new FormData((event.currentTarget))
    const userData = {
        fullname: data.get("fullname"),
        phone_number: data.get("phone_number"),
        email: data.get("email"),
        password: data.get("password"),
        retype_password: data.get("retype_password"),
        role_id: 1
    }

    register(userData)

    async function register(userData) {
      try{
        const data = await All_API.registerAPI(userData)
          if(data.data.status==="success") {
              ToastSuccess("Register in successfully.")
              navigate('/login')
          }
          else {
            ToastError(data.data.status);
          }
      }catch (error) {
        ToastError(error.response.data.message);
      }
    }

   
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          
          <Grid item xs={12} sm={12} >
            <TextField
              required
              id="fullname"
              name="fullname"
              label="Full Name"
              fullWidth
              autoComplete="given-name"
              sx={{
                '& .MuiInputBase-root': {
                    height: 60, // Đặt độ cao tùy chỉnh
                },
            }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="phone_number"
              name="phone_number"
              label="Phone Number"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="password"
              type="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="retype_password"
              type="password"
              name="retype_password"
              label="Password Confirm"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              className="bg-[#9155FD] w-full"
              type="submit"
              variant="contained"
              size="large"
              sx={{ padding: ".8rem 0", bgcolor: "#9155FD" }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center">
            <p>If you have already account?</p>
            <Button onClick={()=> navigate("/login")}
            className="" size="small">Login</Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
