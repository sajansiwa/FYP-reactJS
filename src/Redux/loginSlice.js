import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: false,
  user: {}
  
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login: (state, action) => {
      state.isLoggedin = true;
      state.user = action.payload;
      console.log("state: ", state.user);
    },
    logout: (state, action) => {
      state.isLoggedin = false;
    }

  },
});

export const { Login, logout } = authSlice.actions;

export default authSlice.reducer;
