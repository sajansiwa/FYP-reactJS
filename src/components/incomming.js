import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { onMessageListener } from "../helpers/firebase_helpers";
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
  Button,
  Container,
  Grid,
  IconButton,
  ListItemAvatar,
  Snackbar,
} from "@mui/material";
import theme from "../theme/theme";
import { deepPurple } from "@mui/material/colors";
import snackbar from "snackbar/lib/snackbar";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useSelector } from "react-redux";
import { baseUrl } from "../constants/AppConstant";

// import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Incoming(props) {
  const { inComingNotification, setInComingNotification } = useState([]);
  const { completedNotification, setCompletedNotification } = useState([]);
  const { cancelledNotification, setCancelledNotification } = useState([]);
  const userInfo = useSelector((state) => state.auth.user);

  const fetchIncoming = async () => {};

  useEffect(() => {
    axios
      .get(`${baseUrl}api/get-visited`, {
        params: {
          email: userInfo.email_id,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  }, [inComingNotification, completedNotification, cancelledNotification]);

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
              <Tab label="Cancelled" />
            </Tabs>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              // p: 1,
              // ml: 32,
              // overflow: "auto",
              // mt: 10,
              bgcolor: "secondary.main",
            }}
          >
            {/* {inComingNotification.map((data) => (
              <List>
                <ListItemLink>
                  <ListItemAvatar>
                    <Avatar
                      alt="A"
                      src="/static/images/avatar/1.jpg"
                      sx={{ bgcolor: deepPurple[900] }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={data.name}
                    // secondary="Emergency for Aayush"
                  />
                </ListItemLink>
              </List>
            ))} */}
          </Box>
        </Container>
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
  return <ListItem button component="a" {...props} />;
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
