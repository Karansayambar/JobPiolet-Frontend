import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: "light",
  currentTheme: "lightMint", // Default theme
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.themeMode === "light") {
        state.themeMode = "dark";
        state.currentTheme = "darkBlue";
      } else {
        state.themeMode = "light";
        state.currentTheme = "lightMint";
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
