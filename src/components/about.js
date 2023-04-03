import React from "react";
import { Box } from "@mui/system";
import DrawerComponent from "./drawer";
import { useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import { Container, ThemeProvider } from "@mui/material";
import theme from "../theme/theme";

const About = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("John Doe");
  const [address, setAddress] = useState("123 Main St, Anytown USA");
  const [phoneNumber, setPhoneNumber] = useState("(123) 456-7890");

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
  };

  const renderTextFields = () => {
    return (
      <Grid container spacing={2}>
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
      <ThemeProvider theme={theme}>
      <Container
        sx={{
          bgcolor: "secondary.main", // set background color
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.25)", // set box shadow
        }}
      >
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
              style={{ width: 300, margin: 20 }}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              label="New Password"
              type="password"
              size="large"
              style={{ width: 300, margin: 20 }}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              label="Confirm New Password"
              type="password"
              size="large"
              style={{ width: 300, margin: 20 }}
            />
          </Grid>
        </Grid>

        <Box sx={{ flexGrow: 1, p: 1, ml: 3, overflow: "auto", mt: 5 }}>
          <Button variant="contained" color="primary" style={{ margin: 5 }}>
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
      <Box component="main" sx={{ flexGrow: 1, p: 1, ml: 32, mt: 10 }}>
        {isEditMode ? renderTextFields() : renderDetails()}
        {isEditMode && (
          <Container>
            <Box sx={{ flexGrow: 1, p: 1, ml: 3, overflow: "auto", mt: 5 }}>
              <Button
                variant="contained"
                color="primary"
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
    </Box>
  );
};

export default About;
