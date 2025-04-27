import { ArrowDropDown } from "@mui/icons-material";
import {
  Box,
  Button,
  Link as MuiLink,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Phone } from "phosphor-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/candidate" },
  { label: "Find Job", path: "/candidate/findjob" },
  { label: "Dashboard", path: "/candidate/dashboard" },
];

const Header: React.FC = () => {
  // const [select, setSelect] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSignout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    navigate("/auth/");
  };

  return (
    <Box
      py={3}
      px={{ xs: 2, md: 10, lg: 30 }}
      sx={{ bgcolor: theme.palette.grey[200] }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {/* Navigation Links */}
        <Stack direction="row" spacing={3}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <MuiLink
                key={item.label}
                underline="none"
                color="inherit"
                sx={{
                  borderBottom: isActive
                    ? `2px solid ${theme.palette.primary.main}`
                    : "0px",
                  pb: 0.5,
                  cursor: "pointer",
                  transition: "border-bottom 0.3s",
                }}
                onClick={() => navigate(item.path)}
              >
                <Typography
                  variant="body1"
                  color={isActive ? "primary" : "text.secondary"}
                >
                  {item.label}
                </Typography>
              </MuiLink>
            );
          })}
        </Stack>

        {/* Contact & Language */}
        <Stack direction="row" spacing={3} alignItems="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Phone size={20} />
            <Typography>+782636263627</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography>English</Typography>
            <ArrowDropDown />
          </Stack>
          <Button onClick={() => handleSignout()} variant="contained">
            SignOut
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
