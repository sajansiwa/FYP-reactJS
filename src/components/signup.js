import * as React from "react";
// MUI imports
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import theme from "../theme/theme";
import { ThemeProvider } from "@mui/material/styles";
// other imports
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = "AIzaSyDh-hd8fgRHqk9ll9faCCuGA5vjka_XVCU";

const SignupForm = () => {
  // const dispatch = useDispatch();
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const regPayload = {
      email: data.get("email"),
      name: data.get("name"),
      password: data.get("password"),
      phoneNumber: data.get("phone"),
      address: data.get("address"),
    };

    const name = data.get("name")
    // const name = data.get("name")

    try {
      const response = await axios.post(
        "http://localhost:4000/api/signup",
        regPayload
      );
      const responseData = response.data;
      console.log("regres::", responseData);


      if (responseData.isRegistered === true) {
        nav("/");
        axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${API_KEY}`
          )
          .then((response) => {
            const location = response.data.results[0].geometry.location;
            const latitude = location.lat;
            const longitude = location.lng;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            width: "100%",
            // background: "blue",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon style={{ color: "#3D5A80" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="name"
                  label="Hospital Name"
                  type="text"
                  id="hospital name"
                  sx={{ width: "100%" }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  type="text"
                  id="Phone number"
                  sx={{ width: "100%" }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  type="text"
                  id="address"
                  sx={{ width: "100%" }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  sx={{ width: "100%" }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              // fullWidth
              size="large"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignupForm;
