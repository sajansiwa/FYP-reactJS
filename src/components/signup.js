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
import Joi from "joi";
import { useSnackbar } from "notistack";
import { getFcmToken } from "../helpers/firebase_helpers";
import { CircularProgress } from "@mui/material";

const API_KEY = "AIzaSyDh-hd8fgRHqk9ll9faCCuGA5vjka_XVCU";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  name: Joi.string().required(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  phoneNumber: Joi.string().required(),
  address: Joi.string().required(),
  fcmtoken: Joi.string(),
  isHospital: Joi.bool(),
});

const SignupForm = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);
  // const dispatch = useDispatch();
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const token = await getFcmToken();

    const regPayload = {
      email: data.get("email"),
      name: data.get("name"),
      password: data.get("password"),
      phoneNumber: data.get("phone"),
      address: data.get("address"),
      fcmtoken: token,
      isHospital: true,
    };

    const { error, value } = schema.validate(regPayload);
    if (error) {
      enqueueSnackbar(error);
      return;
    }

    const name = data.get("name");
    // const name = data.get("name")

    try {
      const response = await axios.post(
        "http://localhost:4000/api/signup",
        regPayload
      );
      const responseData = response.data;
      enqueueSnackbar(response.data.message);
      nav("/");
    } catch (err) {
      enqueueSnackbar(err);
    }
    setLoading(false);
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

            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                type="submit"
                // fullWidth
                size="large"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Account
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignupForm;
