import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import All_API from "../../../State/Auth/All_API";
import { ToastError, ToastSuccess } from "../../../admin/components/BodyMain/notification/Notification";

const LoginForm = ({closeModal}) => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = new FormData((event.currentTarget))
    const userData = {
        phone_number: data.get("phone_number"),
        password: data.get("password"),
        role_id: 1
    }
    login(userData)

    async function login(userData) {
      try{
        const data = await All_API.loginAPI(userData)
          if(data.data.token) {
              localStorage.setItem("jwt", data.data.token)
              ToastSuccess("Login in successfully.")
              navigate('/')
              closeModal()
          }
          else {
            ToastError("Incorrect phone number or password.")
          }
      }catch {
        ToastError("Please try again.")
      }
    }


  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          
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
              id="password"
              type="password"
              name="password"
              label="Password"
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
              Login
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center">
            <p>If you dont't have account?</p>
            <Button onClick={()=> navigate("/register")}
            className="" size="small">Register</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
