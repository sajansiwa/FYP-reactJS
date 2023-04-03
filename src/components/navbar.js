import * as React from "react";
import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import theme from "../theme/theme";
import { Link } from "react-router-dom";
import { Link as MuiLink } from "@material-ui/core";
import { ThemeProvider } from "@mui/material/styles";

const NavBar = () => {
  
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button color="inherit">
            <MuiLink
              component={Link}
              to="/"
              underline="none"
              color="inherit"
            >
              Sign In
            </MuiLink>
          </Button>
          <Button color="inherit">
            {/* {" "} */}
            <MuiLink
              component={Link}
              to="/signup"
              underline="none"
              color="inherit"
            >
              Sign Up
            </MuiLink>
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
