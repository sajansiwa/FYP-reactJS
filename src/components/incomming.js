import React from "react";
import { Box } from "@mui/system";
// import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DrawerComponent from "./drawer";
// import { CssBaseline } from "@material-ui/core";

const Incomming = () => {
  return (
    <Box>
      <DrawerComponent />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 1, ml: 32, overflow: "auto", mt: 10 }}
      >
        <Typography paragraph>
      
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>

      </Box>
    </Box>
  );
};

export default Incomming;
