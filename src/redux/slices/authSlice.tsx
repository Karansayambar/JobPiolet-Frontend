import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  user: null,
  user_id: null,
  email: "",
  role: "",
  error: false,
};

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
    signOut(state, action) {
      state.isLoggedIn = false;
      state.token = "";
      state.user_id = null;
      localStorage.removeItem("token");
    },
    updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    },
  },
});

export const { updateIsLoading, logIn, signOut, updateRegisterEmail } =
  authSlice.actions;
export default authSlice.reducer;
