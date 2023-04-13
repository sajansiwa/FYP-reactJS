import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../constants/AppConstant";
import { useDispatch } from "react-redux";
import Joi from "joi";

const forgetPasswordSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

export default function ForgetPassword(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get("email"),
    };
    const { error, value } = forgetPasswordSchema.validate(payload);
    if (error) {
      enqueueSnackbar(error);

      return;
    }
    const response = await axios.post(`${baseUrl}api/passwordreset`, {
      email: data.get("email"),
    });
    if (response.status == 200) {
      enqueueSnackbar(response.data.message);
      nav("/");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0", // Added background color
      }}
    >
      <div
        style={{
          maxWidth: 400,
          width: "100%",
          padding: 20, // Added padding for spacing
          backgroundColor: "#fff", // Added background color
          borderRadius: 4, // Added border radius for rounded corners
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)", // Added box shadow for depth
        }}
      >
        <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
          Reset Password
        </Typography>{" "}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            id="email"
            autoComplete="email"
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <div
            style={{
              marginTop: "10px",
            }}
          ></div>

          <Button
            loading
            color="primary"
            variant="outlined"
            fullWidth
            type="submit"
          >
            Reset Password
          </Button>
        </Box>
        <div
          style={{
            marginTop: "10px",
          }}
        ></div>
      </div>
    </div>
  );
}
