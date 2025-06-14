import {
  Box,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  Divider,
} from "@mui/material";
import { Search, SearchIconWrapper, StyledInputBase } from "../../Search";
import { MagnifyingGlass } from "phosphor-react";
import { PinDropOutlined } from "@mui/icons-material";
import { HeroChip } from "../../Common/HeroChip";
import illustration from "../../../assets/auth/Illustration.png";

const HeroComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      px={{ xs: 2, sm: 6, md: 15, lg: 30 }}
      py={8}
      bgcolor={theme.palette.grey[100]}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack>
          <Box width={isMobile ? "100%" : 700}>
            <Typography
              variant="h2"
              fontWeight={600}
              fontSize={{ xs: 32, sm: 42, md: 56, lg: 60 }}
              gutterBottom
            >
              Find a job that suits your interest & skills.
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              fontSize={{ sm: 16, lg: 20 }}
            >
              Aliquam vitae turpis in diam convallis finibus in at risus. Nullam
              in scelerisque leo, eget sollicitudin velit vestibulum.
            </Typography>
          </Box>
          <Stack direction={"row"} alignItems={"center"}>
            <Stack>
              <Stack py={4}>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{
                    border: `1px solid ${theme.palette.grey[300]}`,
                    borderRadius: 1,
                    px: 2,
                    py: 2,
                    maxWidth: 700,
                  }}
                >
                  <Search>
                    <SearchIconWrapper>
                      <MagnifyingGlass color="#709CE6" size={18} />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Job title, keyword, company"
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Search>
                  <Divider orientation="vertical" flexItem />

                  <Search>
                    <SearchIconWrapper>
                      <PinDropOutlined
                        style={{ color: "#709CE6" }}
                        fontSize="small"
                      />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Yout Location"
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Search>
                  <Button
                    variant="contained"
                    sx={{
                      py: 1.5,
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: 16,
                      width: "200px",
                    }}
                  >
                    Find Job
                  </Button>
                </Stack>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <Typography color={theme.palette.grey[700]}>
                  Suggestion:
                </Typography>
                <Typography>Designer, Programming,</Typography>
                <Typography color="primary">Digital Marketing</Typography>
                <Typography>, Video, Animation</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <img src={illustration} />
        </Stack>
      </Stack>
      <HeroChip />
    </Box>
  );
};

export default HeroComponent;
