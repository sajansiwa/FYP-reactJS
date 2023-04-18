import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";

import { Box } from "@mui/system";
// import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DrawerComponent from "./drawer";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Avatar,
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListSubheader,
  Snackbar,
  Switch,
} from "@mui/material";
import theme from "../theme/theme";
import { deepPurple } from "@mui/material/colors";
import snackbar from "snackbar/lib/snackbar";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useSelector } from "react-redux";
import { baseUrl } from "../constants/AppConstant";
import { onMessage } from "firebase/messaging";
import { CheckBox } from "@mui/icons-material";

// import { CssBaseline } from "@material-ui/core";

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Incoming(props) {
  const [inComingNotification, setInComingNotification] = useState([]);
  const [completedNotification, setcompletedNotification] = useState([]);
  const userInfo = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState(0);
  const [checked, setChecked] = React.useState("");

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    const id = value.v_id;
    try {
      setLoading(true);
      axios
        .post(`${baseUrl}api/markAsComplete`, {
          id,
        })
        .then((data) => {
          setLoading(false);
          getIncomingPatient();
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    onMessage((payload) => {
      getIncomingPatient();
    });
  }, []);

  useEffect(() => {
    getIncomingPatient();
  }, [value]);

  async function getIncomingPatient() {
    setLoading(true);
    await sleep(2000);
    if (value === 0) {
      setInComingNotification([]);
      const response = await axios.get(`${baseUrl}api/get-visited`, {
        params: {
          email: userInfo.email_id,
          type: false,
        },
      });
      setLoading(false);
      setInComingNotification(response.data);
    } else {
      setcompletedNotification([]);
      const response = await axios.get(`${baseUrl}api/get-visited`, {
        params: {
          email: userInfo.email_id,
          type: true,
        },
      });
      setLoading(false);
      setcompletedNotification(response.data);
    }
    setLoading(false);
  }

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Incoming" />
              <Tab label="Completed" />
            </Tabs>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              bgcolor: "secondary.main",
              marginLeft: 30,
              flexDirection: "column",
            }}
          >
            {/* {inComingNotification.map((data) => (
              <List key={data}>
                <ListItemLink
                  secondary={
                    <IconButton aria-label="comment">
                      <CommentIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={data.name.toUpperCase()}
                      src="/static/images/avatar/1.jpg"
                      sx={{ bgcolor: deepPurple[900] }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={data.name}
                    secondary="Incoming Emergency"
                  />
                </ListItemLink>
              </List>
            ))} */}
            {value === 0 ? (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {inComingNotification.length == 0 ? (
                  <Box
                    centered
                    alignItems="center"
                    display="flex"
                    height="50vh"
                    alignContent="center"
                    textAlign="center"
                  >
                    <Typography
                      component="h6"
                      variant="h6"
                      sx={{
                        color: "#3D5A80",
                        marginLeft: 10,
                      }}
                      textAlign="center"
                    >
                      No Incoming Patient, When Patient Check in, You'll get
                      Notification and List will display here.
                    </Typography>
                  </Box>
                ) : (
                  inComingNotification.map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                      <ListItem
                        key={value.id}
                        secondaryAction={
                          <IconButton edge="end" aria-label="comments">
                            <DoneIcon />
                          </IconButton>
                        }
                      >
                        <ListItemButton
                          role={undefined}
                          onClick={handleToggle(value)}
                          dense
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            id={labelId}
                            primary={`Emergency for ${value.name}`}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })
                )}
              </List>
            ) : (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {completedNotification.length == 0 ? (
                  <Box
                    centered
                    alignItems="center"
                    display="flex"
                    height="50vh"
                    alignContent="center"
                    textAlign="center"
                  >
                    <Typography
                      component="h6"
                      variant="h6"
                      sx={{
                        color: "#3D5A80",
                        marginLeft: 10,
                      }}
                      textAlign="center"
                    >
                      No Completed Item here, When Patient Check in, You can
                      complete the Check In.
                    </Typography>
                  </Box>
                ) : (
                  completedNotification.map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                      <ListItem key={value.id}>
                        <ListItemButton role={undefined} onClick={null} dense>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={true}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            id={labelId}
                            primary={`Emergency for ${value.name}`}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })
                )}
              </List>
            )}
          </Box>
        </Container>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </ThemeProvider>
  );
}

function ListItemLink(props) {
  return <ListItem button component="a" {...props} secondaryAction />;
}
