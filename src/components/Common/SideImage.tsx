import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Suitcase } from "phosphor-react";
import loginImage from "../../assets/auth/authHero.png";

const SideImage: React.FC = () => {
  return (
    <Box width="50vw" height="100%" position="relative">
      {/* Background Image */}
      <img
        src={loginImage}
        alt="Login illustration"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Overlay Content */}
      <Stack
        width={"500px"}
        spacing={2}
        position="absolute"
        bottom={"20%"}
        left={"10%"}
        zIndex={1}
        color="#fff"
      >
        <Typography variant="h5" fontWeight={500} fontSize={40}>
          Over 1,75,324 candidates waiting for good employers.
        </Typography>

        <Stack direction="row" spacing={10}>
          {/* Live Jobs */}
          <Stack direction="column" alignItems="center" spacing={4}>
            <Box bgcolor={"#3C4C67"} padding={2} borderRadius={1}>
              <Suitcase size={28} />
            </Box>
            <Stack>
              <Typography variant="body1">1,75,324 </Typography>
              <Typography variant="caption">live jobs</Typography>
            </Stack>
          </Stack>

          {/* Companies */}
          <Stack direction="column" alignItems="center" spacing={4}>
            <Box bgcolor={"#3C4C67"} padding={2} borderRadius={1}>
              <Suitcase size={28} />
            </Box>
            <Stack>
              <Typography variant="body1">97,324</Typography>
              <Typography variant="caption">companies</Typography>
            </Stack>
          </Stack>

          {/* New Jobs */}
          <Stack direction="column" alignItems="center" spacing={4}>
            <Box bgcolor={"#3C4C67"} padding={2} borderRadius={1}>
              <Suitcase size={28} />
            </Box>

            <Stack>
              <Typography variant="body1">97,324</Typography>
              <Typography variant="caption">New jobs</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideImage;
