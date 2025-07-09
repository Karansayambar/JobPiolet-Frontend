import { createTheme } from "@mui/material/styles";

// Light Themes
export const lightMint = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#f8f9fa" },
    secondary: { main: "#e9ecef" },
    background: { default: "#dee2e6", paper: "#ced4da" },
    text: { primary: "#212529", secondary: "#343a40" },
  },
});

// Dark Themes
export const darkBlue = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#212529" },
    secondary: { main: "#343a40" },
    background: { default: "#212529", paper: "#495057", table: "#343a40" },
    text: { primary: "#f8f9fa", secondary: "#e9ecef" },
  },
});

// Theme Map
export const themes = {
  lightMint,
  darkBlue,
};
