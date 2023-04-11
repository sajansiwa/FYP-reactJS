import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import Joi from "joi";
import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../constants/AppConstant";

const passwordResetSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  confirm_password: Joi.ref("password"),
});

export default function ResetPassword() {
  const { enqueueSnackbar } = useSnackbar();
  const nav = useNavigate();

  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const token = `${location.search.replace("?", "")}`;
    const payload = {
      token,
      password: data.get("password"),
      confirm_password: data.get("confirm_password"),
    };
    const { error, value } = passwordResetSchema.validate(payload);
    if (error) {
      enqueueSnackbar(error);

      return;
    }
    try {
      const response = await axios.post(`${baseUrl}api/reset`, {
        password: data.get("password"),
        token,
      });
      if (response.status == 200) {
        enqueueSnackbar(response.data.message);
        nav("/");
      }
    } catch (error) {
      enqueueSnackbar(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        style={{ marginTop: "50vh", transform: "translateY(-50%)" }}
        onSubmit={handleSubmit}
        component="form"
        noValidate
      >
        <Typography component="h1" variant="h4" py="10px">
          Reset Password
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              name="password"
              // onChange={handleEmailChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              name="confirm_password"
              fullWidth
              // onChange={handlePasswordChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              type="submit"
              // onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
