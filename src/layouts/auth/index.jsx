import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <Stack
        sx={{ width: "100%" }}
        direction="column"
        alignItems={"center"}
        boxSizing={"border-box"}
      >
        <Outlet />
      </Stack>
    </>
  );
};

export default AuthLayout;
