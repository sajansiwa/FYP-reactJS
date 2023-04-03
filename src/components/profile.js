import React from "react";
import { Avatar, Grid, Typography } from "@material-ui/core";
import DrawerComponent from "./drawer";
import { Box } from "@material-ui/core";

const UserProfile = ({ name, email, avatarUrl }) => {
  return (
    // <Grid container alignItems="center" spacing={2}>
    //   <Grid item>
    //     <Avatar alt={name} src={avatarUrl} />
    //   </Grid>
    //   <Grid item xs={6}>
    //     <Typography variant="h6">{name}</Typography>
    //     <Typography variant="subtitle1">{email}</Typography>
    //   </Grid>
    // </Grid>

    <Box>
      <DrawerComponent />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 1, ml: 32, overflow: "auto", mt: 10 }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar alt={name} src={avatarUrl} />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="subtitle1">{email}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserProfile;
