import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import theme from "../theme/theme";
import { ThemeProvider } from "@mui/material";
import { baseUrl } from "../constants/AppConstant";

const drawerWidth = 240;

export default function DrawerComponent() {
  const navigate = useNavigate();

  const logoutFuncion = () => {
    axios.post(`${baseUrl}api/logout`);
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: "primary.main",
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Hospital
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,

            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem
                disablePadding
                onClick={() => {
                  navigate("/HomeComponent");
                }}
              >
                <ListItemButton>
                  <ListItemIcon>{/* Add your icon here */}</ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                onClick={() => {
                  navigate("/about");
                }}
              >
                <ListItemButton>
                  <ListItemIcon>{/* Add your icon here */}</ListItemIcon>
                  <ListItemText primary="About" />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                onClick={() => {
                  navigate("/incomming");
                }}
              >
                <ListItemButton>
                  <ListItemIcon>{/* Add your icon here */}</ListItemIcon>
                  <ListItemText primary="Incoming" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={logoutFuncion}>
                <ListItemButton>
                  <ListItemIcon>{/* Add your icon here */}</ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
          </Box>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
