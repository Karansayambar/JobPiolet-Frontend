import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Logo from "../../assets/auth/Logo.png";
import React from "react";
import { CaretDown, MagnifyingGlass } from "phosphor-react";
import Search from "../Search/Search";
import SearchIconWrapper from "../Search/SearchWrapper";
import StyledInputBase from "../Search/StyledInputBase";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const theme = useTheme();
  const { isLoggedIn, token, user_Id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("clicking");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("profileCreated");
    localStorage.removeItem("companyProfile");
    dispatch(
      signOut({
        isLoggedIn: false,
        token: "",
        user_Id: "",
        role: "",
      })
    );
    navigate("/");
  };

  return (
    <Box px={{ xs: 2, md: 6, lg: 30 }} py={2}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={4}
        justifyContent="space-between"
      >
        {/* Logo */}
        <img src={Logo} style={{ height: 45, width: 150 }} alt="Logo" />

        {/* Search Bar */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            border: `1px solid ${theme.palette.grey[400]}`,
            borderRadius: 1,
            px: 2,
            py: 0.5,
            width: "100%",
            maxWidth: 700,
          }}
        >
          {/* Location Dropdown */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Location
            </Typography>
            <CaretDown size={16} />
          </Stack>

          {/* Divider */}
          <Divider orientation="vertical" flexItem />

          {/* Search Input */}
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" size={18} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Job title, keyword, company"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Stack>

        {/* Auth Buttons */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            sx={{ textTransform: "none" }}
            onClick={handleLogout}
          >
            Sign Out
          </Button>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
            }}
          >
            Post a Job
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SearchBar;
