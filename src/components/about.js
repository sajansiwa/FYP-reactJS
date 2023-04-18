import React, { useEffect } from "react";
import { Box } from "@mui/system";
import DrawerComponent from "./drawer";
import { useState } from "react";
import { TextField, Button, Grid, Backdrop } from "@material-ui/core";
import { CircularProgress, Container, ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import axios from "axios";
import { baseUrl } from "../constants/AppConstant";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import Joi from "joi";
import { sleep } from "./incomming";

const changePasswordSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  currentPassword: Joi.string()
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

const About = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("John Doe");
  const [address, setAddress] = useState("123 Main St, Anytown USA");
  const [phoneNumber, setPhoneNumber] = useState("(123) 456-7890");
  const userInfo = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    getprofileInfo();
  }, []);

  async function getprofileInfo() {
    setLoading(true);
    await sleep(2000);
    const res = await axios.get(`${baseUrl}api/user`, {
      params: {
        email: userInfo.email_id,
      },
    });
    console.log(res.data);
    setUser(res.data);
    setAddress(res.data.address);
    setPhoneNumber(res.data.phone_number);
    setName(res.data.name);
    setLoading(false);
  }

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    handleSubmit();
    setIsEditMode(false);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
  };

  const updatePassword = async () => {
    try {
      setLoading(true);
      await sleep(2000);
      const payload = {
        currentPassword: currentPassword,
        password,
        email: userInfo.email_id,
      };
      const { error, value } = changePasswordSchema.validate(payload);
      if (error) {
        enqueueSnackbar(error);
        setLoading(false);
        return;
      }
      const response = await axios.post(
        `${baseUrl}api/updatePassword`,
        payload
      );
      console.log(response.data);
      enqueueSnackbar("Password Updated");
      setLoading(false);
    } catch (error) {
      enqueueSnackbar(error);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // event.preventDefault();
    const payload = {
      // email: data.get("email"),
      name: name,
      address: address,
      phoneNumber: phoneNumber,
      email: userInfo.email_id,
    };
    try {
      setLoading(true);
      await sleep(2000);
      const { data } = await axios.post(`${baseUrl}api/updateUser`, {
        ...payload,
      });
      enqueueSnackbar("User info updated!");

      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(`Error: ${error}`);
    }
  };

  const renderTextFields = () => {
    return (
      <Grid
        container
        spacing={2}
        component="form"
        onSubmit={handleSubmit}
        noValidate
      >
        <Grid item xs={10}>
          <TextField
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            size="large"
            style={{ width: 300, margin: 20 }}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            label="Address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            style={{ width: 300, margin: 20 }}
            size="large"
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            style={{ width: 300, margin: 20 }}
            size="large"
          />
        </Grid>
      </Grid>
    );
  };

  const renderDetails = () => {
    return (
      <Box>
        <ThemeProvider theme={theme}>
          <Container
            sx={{
              bgcolor: "secondary.main", // set background color
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.25)", // set box shadow
            }}
          >
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <TextField
                      label="Name"
                      value={name}
                      size="large"
                      InputProps={{ readOnly: true }}
                      style={{ width: 300, margin: 20 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Address"
                      value={address}
                      size="large"
                      InputProps={{ readOnly: true }}
                      style={{ width: 300, margin: 20 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Phone Number"
                      value={phoneNumber}
                      full
                      InputProps={{ readOnly: true }}
                      style={{ width: 300, margin: 20 }}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ flexGrow: 1, p: 1, ml: 3, overflow: "auto", mt: 5 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditClick}
                  >
                    Edit
                  </Button>
                </Box>
              </Box>

              <Box>{changePassword()}</Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Box>
    );
  };

  const changePassword = () => {
    return (
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              label="Current Password"
              type="password"
              size="large"
              onChange={(event) => setCurrentPassword(event.target.value)}
              style={{ width: 300, margin: 20 }}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              label="New Password"
              type="password"
              size="large"
              onChange={(event) => setPassword(event.target.value)}
              style={{ width: 300, margin: 20 }}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              label="Confirm New Password"
              type="password"
              size="large"
              onChange={(event) => setPassword2(event.target.value)}
              style={{ width: 300, margin: 20 }}
            />
          </Grid>
        </Grid>

        <Box sx={{ flexGrow: 1, p: 1, ml: 3, overflow: "auto", mt: 5 }}>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: 5 }}
            onClick={() => updatePassword()}
          >
            Save
          </Button>
          <Button variant="contained" color="secondary" style={{ margin: 5 }}>
            Cancel
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <DrawerComponent />
      {loading ? (
        <CircularProgress sx={{ flexGrow: 1, p: 1, ml: 32, mt: 10 }} />
      ) : (
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 1, ml: 32, mt: 10, borderRadius: "8px" }}
        >
          {isEditMode ? renderTextFields() : renderDetails()}
          {isEditMode && (
            <Container>
              <Box sx={{ flexGrow: 1, p: 1, ml: 3, overflow: "auto", mt: 5 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleSaveClick}
                  style={{ margin: 5 }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCancelClick}
                  style={{ margin: 5 }}
                >
                  Cancel
                </Button>
              </Box>

              {/* <Box>
              changePassword()
            </Box> */}
            </Container>
          )}
        </Box>
      )}
    </Box>
  );
};

export default About;
