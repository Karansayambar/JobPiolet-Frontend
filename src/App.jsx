import { useSelector } from "react-redux";
import AppRoute from "./routes/AppRoute";
import { SocketProvider } from "./utils/socket";
import { themes } from "./utils/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeProvider } from "@emotion/react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function App() {
  const { currentTheme } = useSelector((state) => state.theme);
  const theme = themes[currentTheme];
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <SocketProvider>
            <AppRoute />
          </SocketProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
