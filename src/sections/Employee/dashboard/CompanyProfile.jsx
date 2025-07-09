import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetProfileQuery } from "../../../services/companyApi";

const CompanyProfile = () => {
  const user_id = localStorage.getItem("user_id");
  const [userData, setUserData] = useState({});

  // Component
  const { data } = useGetProfileQuery(user_id);

  useEffect(() => {
    if (data?.userProfile) {
      const profile = data.userProfile;
      console.log("profile", profile);
      setUserData(profile);
      console.log("Fetched profile from RTK Query:", profile);
    }
  }, [data]);

  return (
    <Box bgcolor={"#f5f5f5"} minHeight="100vh" py={8}>
      {/* Banner + Logo Section */}
      <Box position="relative" width="100%" height="350px">
        <Box
          component="img"
          src={userData?.companyInfo?.bannerUrl}
          alt="Banner"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <Box
          position="absolute"
          bottom={-40}
          left={32}
          display="flex"
          alignItems="center"
          gap={3}
          zIndex={1}
        >
          <Avatar
            alt="Company Logo"
            src={userData?.companyInfo?.logoUrl}
            sx={{
              width: 80,
              height: 80,
              border: "3px solid white",
            }}
          />
          <Stack spacing={1}>
            <Typography variant="h5" sx={{ color: "#fff" }}>
              {userData?.companyInfo?.companyName}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "black", fontWeight: 700 }}
            >
              {userData?.foundingInfo?.industryType} |{" "}
              {userData?.companyInfo?.address}
            </Typography>
          </Stack>
        </Box>
      </Box>

      {/* Main Info Section */}
      <Stack
        mt={10}
        px={4}
        py={4}
        spacing={4}
        bgcolor="white"
        borderRadius={2}
        mx={3}
      >
        {/* About */}
        <Box>
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography color="text.secondary">
            {userData?.companyInfo?.about || "No description available."}
          </Typography>
        </Box>

        <Divider />

        {/* Company Details */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Company Details
          </Typography>
          <Stack spacing={1}>
            <Typography>
              <strong>Organization Type:</strong>{" "}
              {userData?.foundingInfo?.organisationType}
            </Typography>
            <Typography>
              <strong>Industry:</strong> {userData?.foundingInfo?.industryType}
            </Typography>
            <Typography>
              <strong>Team Size:</strong> {userData?.foundingInfo?.teamSize}
            </Typography>
            <Typography>
              <strong>Vision:</strong> {userData?.foundingInfo?.companyVision}
            </Typography>
            <Typography>
              <strong>Website:</strong>{" "}
              <a
                href={userData?.foundingInfo?.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1976d2" }}
              >
                {userData?.foundingInfo?.companyWebsite}
              </a>
            </Typography>
          </Stack>
        </Box>

        <Divider />

        {/* Contact Info */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Contact Information
          </Typography>
          <Stack spacing={1}>
            <Typography>
              <strong>Email:</strong> {userData?.contactInfo?.email}
            </Typography>
            <Typography>
              <strong>Phone:</strong> {userData?.contactInfo?.phone}
            </Typography>
            <Typography>
              <strong>Address:</strong> {userData?.contactInfo?.address}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default CompanyProfile;
