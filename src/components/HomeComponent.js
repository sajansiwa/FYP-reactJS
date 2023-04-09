import React from "react";
import { Box } from "@mui/system";
// import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import DrawerComponent from "./drawer";
import { Container, ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
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
              p: 1,
              ml: 32,
              overflow: "auto",
              mt: 10,
              bgcolor: "secondary.main",
              height: 100,
            }}
          >
            <Typography className={classes.name} fontFamily={"Lora"}>
              {name}
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
