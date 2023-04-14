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

  const [checked, setChecked] = React.useState("");

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    const id = value.v_id;
    try {
      axios
        .post(`${baseUrl}api/markAsComplete`, {
          id,
        })
        .then((data) => {
          getIncoming();
        });
    } catch (error) {}

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    onMessage((payload) => {
      getIncoming();
    });

    getIncoming();
  }, []);
  async function getIncoming() {
    setLoading(true);
    await sleep(2000);
    axios
      .get(`${baseUrl}api/get-visited`, {
        params: {
          email: userInfo.email_id,
        },
      })
      .then((response) => {
        console.log(response.data);
        response.data.filter((data) => {
          if (data.is_completed) {
            setcompletedNotification(response.data);
          } else {
            setInComingNotification(response.data);
          }
        });
        setLoading(false);
      });
  }

  const classes = useStyles();

  const [value, setValue] = useState(0);

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
            {value == 0 ? (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {inComingNotification.map((value) => {
                  const labelId = `checkbox-list-label-${value}`;

                  return (
                    <ListItem
                      key={value}
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
                })}
              </List>
            ) : (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {completedNotification.map((value) => {
                  const labelId = `checkbox-list-label-${value}`;

                  return (
                    <ListItem key={value}>
                      <ListItemButton
                        role={undefined}
                        disabled
                        onClick={handleToggle(value)}
                        dense
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={true}
                            disabled
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
                })}
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

// const Incomming = () => {
//   const [notifications, setNotifications] = useState(["aayush"]);
//   const classes = useStyles();

//   return (
//     <Grid>
//       <Grid xs={8}>

//       </Grid>
//       <Box
//         component="main"
//         sx={{ p: 1, ml: 32, overflow: "auto", mt: 5 }}
//         centered
//       ></Box>
//       <div className={classes.root}>

//         {value === 0 && (
//           <List
//             sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
//           >
//             <ListItemLink href="#">
//               <ListItemText
//                 primary="Item 3"
//                 secondary="This is a completed item"
//               />
//             </ListItemLink>
//           </List>
//         )}

//         {value === 1 && (

//         )}

//         {value === 2 && (
//           <List>
//             <ListItemLink href="#">
//               <ListItemAvatar>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
//               </ListItemAvatar>
//               <ListItemText
//                 primary="Item 5"
//                 secondary="This is a cancelled item"
//               />
//             </ListItemLink>
//             <ListItemLink href="#">
//               <ListItemText
//                 primary="Item 6"
//                 secondary="This is also a cancelled item"
//               />
//             </ListItemLink>
//           </List>
//         )}
//       </div>
//     </Grid>
//   );
// };

function ListItemLink(props) {
  return <ListItem button component="a" {...props} secondaryAction />;
}

// export default Incomming;

// //  <List
// //   sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
// // >
// //   {[0, 1, 2, 3, 4, 5, 6].map((value) => {
// //     const labelId = `checkbox-list-label-${value}`;

// //     return (
// //       <ListItem
// //         key={value}
// //         secondaryAction={
// //           <IconButton edge="end" aria-label="comments">
// //             {/* <CommentIcon /> */}
// //           </IconButton>
// //         }
// //         disablePadding
// //       >
// //         <ListItemButton role={undefined} dense>
// //           <ListItemText
// //             id={labelId}
// //             primary={`Line item ${value + 1}`}
// //           />
// //         </ListItemButton>
// //       </ListItem>
// //     );
// //   })}
// // </List>
