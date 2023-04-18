import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import theme from "../theme/theme";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { Login } from "../Redux/loginSlice";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { useSnackbar } from "notistack";
import { getFcmToken } from "../helpers/firebase_helpers";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const signInSchema = Joi.object({
  email_id: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  fcmtoken: Joi.string(),
});

const SignInForm = () => {
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedin);

  const { showDialog, setShowDialog } = React.useState(false);
  const handleClickOpen = () => {
    setShowDialog(true);
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const nav = useNavigate();

  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const token = await getFcmToken();
    const payload = {
      email_id: data.get("email"),
      password: data.get("password"),
      fcmtoken: token,
    };
    const { error, value } = signInSchema.validate(payload);
    if (error) {
      enqueueSnackbar(error);
      setLoading(false);
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/Login",
          payload
        );
        // const responseData = response.data;

        const responseData = response.data;
        if (response.data.isUserVerified != true) {
          enqueueSnackbar(
            "You are Not Verified, Please follow verification email to verify your email and login",
            {
              disableWindowBlurListener: true,
              variant: "error",

              anchorOrigin: {
                horizontal: "center",
                vertical: "top",
              },
            }
          );
        } else {
          setLoading(false);
          console.log(responseData);
          if (responseData.loggedIn === true) {
            nav("/HomeComponent");
            dispatch(Login(responseData));
          }
        }
        setLoading(false);
      } catch (error) {
        enqueueSnackbar(error.response.data.message);
        setLoading(false);
      }
    }

    // console.log(res);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon style={{ color: "#3D5A80" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            )}
            <Grid container>
              <Grid item xs>
                <Button
                  variant="outlined"
                  onClick={() => nav("/forget-password")}
                >
                  Forget Password?
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignInForm;
