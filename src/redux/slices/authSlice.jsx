import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
      state.role = action.payload.role;
      localStorage.setItem("token", action.payload.token);
    },
    signOut(state) {
      state.isLoggedIn = false;
      state.token = "";
      state.user_id = null;
      state.role = "";
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user_id");
    },
    updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    },
  },
});

export const { updateIsLoading, logIn, signOut, updateRegisterEmail } =
  authSlice.actions;
export default authSlice.reducer;
