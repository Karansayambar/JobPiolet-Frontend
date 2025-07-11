import { createTheme } from "@mui/material/styles";

// Light Themes
export const lightMint = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#e7f0fa" },
    secondary: { main: "#0a65cc" },
    error: { main: "#E63946" },
    warning: { main: "#F4A261" },
    info: { main: "#2196F3" },
    success: { main: "#118B50" },
    background: {
      default: "#F8F9FA",
      paper: "#FFFFFF",
    },
    text: {
      main: "#0a65cc",
      primary: "#212529",
      secondary: "#495057",
    },
    divider: "#CED4DA",
    action: {
      hover: "#E9ECEF",
      selected: "#DEE2E6",
      disabled: "#ADB5BD",
      disabledBackground: "#E9ECEF",
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Segoe UI', 'Helvetica Neue', sans-serif`,
    h1: { fontSize: "2.5rem", fontWeight: 600 },
    h2: { fontSize: "2rem", fontWeight: 600 },
    h3: { fontSize: "1.75rem", fontWeight: 500 },
    body1: { fontSize: "1rem" },
    button: { textTransform: "none", fontWeight: 500 },
  },
});

// Dark Themes
export const darkBlue = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#0a65cc" },
    secondary: { main: "#1A936F" },
    error: { main: "#FF6B6B" },
    warning: { main: "#FFA500" },
    info: { main: "#00BFFF" },
    success: { main: "#20C997" },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#F8F9FA",
      secondary: "#CED4DA",
    },
    divider: "#343A40",
    action: {
      hover: "#343A40",
      selected: "#495057",
      disabled: "#6C757D",
      disabledBackground: "#343A40",
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Segoe UI', 'Helvetica Neue', sans-serif`,
    h1: { fontSize: "2.5rem", fontWeight: 600 },
    h2: { fontSize: "2rem", fontWeight: 600 },
    h3: { fontSize: "1.75rem", fontWeight: 500 },
    body1: { fontSize: "1rem" },
    button: { textTransform: "none", fontWeight: 500 },
  },
});

// Theme Map
export const themes = {
  lightMint,
  darkBlue,
};
