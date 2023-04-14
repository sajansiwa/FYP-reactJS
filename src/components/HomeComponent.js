import React, { useEffect } from "react";
import { Box } from "@mui/system";
// import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import DrawerComponent from "./drawer";
import { Container, ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import { useSelector } from "react-redux";
// import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  name: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "100 px", // Set font size to 3rem
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();
  const name = "name";
  const user = useSelector((state) => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <DrawerComponent />
        <Container>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              p: 12,
              ml: 32,
              overflow: "auto",
              mt: 10,
              bgcolor: "secondary.main",
              flexDirection: "column",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ pb: 1 }}>
              Welcome Back,
            </Typography>
            <Typography
              component="h6"
              variant="h6"
              className={classes.name}
              sx={{ pb: 1 }}
            >
              {user.user.name}
            </Typography>
            <Typography component="p" className={classes.name}>
              email: {user.user.email_id}
            </Typography>
            {/* <Typography fontFamily={"Lora"}>
              {"hams hospital"}
            </Typography> */}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
