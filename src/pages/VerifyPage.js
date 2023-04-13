import axios from "axios";
import react, { useEffect, useState } from "react";
import { baseUrl } from "../constants/AppConstant";
import { Box, CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import { useSnackbar } from "notistack";

const VerifyPage = () => {
  const location = useLocation();
  const nav = useNavigate();

  const { message, setMessage } = useState(null);
  const { loading, setLoading } = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  async function verify() {
    // setLoading = true;
    try {
      const token = `${location.search.replace("?", "")}`;
      const response = await axios.post(`${baseUrl}api/verify`, {
        token,
      });
      console.log(response.data);
      if (response.status == 200) {
        enqueueSnackbar(response.data.message);
        nav("/");
      }
    } catch (error) {
      enqueueSnackbar(error);
    }
    // setLoading = false;
  }

  useEffect(() => {
    verify();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <>
        <CircularProgress
          sx={{
            marginRight: "10px",
          }}
        />
        <p>Verifying, Please wait</p>
      </>
    </Box>
  );
};
export default VerifyPage;
