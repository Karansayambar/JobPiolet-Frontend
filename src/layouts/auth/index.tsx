import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
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
