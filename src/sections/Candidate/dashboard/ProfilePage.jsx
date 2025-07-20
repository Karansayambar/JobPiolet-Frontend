"use client";

import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Chip,
  Avatar,
  Divider,
  Link,
} from "@mui/material";

import { useGetCandidateProfileQuery } from "../../../services/candidateApi";
import {
  Briefcase,
  Calendar,
  FileText,
  Flag,
  Globe,
  GraduationCap,
  MapPin,
  MapPinLine,
  PhoneX,
  User,
} from "phosphor-react";
import { MdMail } from "react-icons/md";
import { BsGlobe } from "react-icons/bs";
// import { formatDistanceToNow } from "date-fns";

export default function ProfilePage() {
  const { data, isLoading, error } = useGetCandidateProfileQuery();
  console.log("user profile data", data);
  if (isLoading)
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5">Loading profile...</Typography>
      </Container>
    );

  if (!data || !data.userProfile)
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" color="text.secondary">
          No profile data found
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Please Update your profile.
        </Typography>
      </Container>
    );

  if (error)
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Error loading profile data
        </Typography>
      </Container>
    );

  const { userProfile } = data;
  const { candidateInfo, contactInfo, profileInfo, appliedJobs } = userProfile;
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Profile Header */}
      <Paper elevation={2} sx={{ mb: 4, overflow: "hidden" }}>
        <Box
          sx={{
            height: 120,
            bgcolor: "primary.main",
            position: "relative",
          }}
        />

        <Grid container spacing={2} sx={{ p: 3, pt: 0 }}>
          <Grid item xs={12} sm={3} md={2} sx={{ mt: -6, textAlign: "center" }}>
            <Avatar
              src={candidateInfo.avatar}
              alt={candidateInfo.fullName}
              sx={{
                width: 120,
                height: 120,
                border: "4px solid white",
                mx: "auto",
              }}
            />
          </Grid>

          <Grid item xs={12} sm={9} md={10}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                mb: 2,
              }}
            >
              <Box>
                <Typography variant="h4" component="h1" fontWeight="bold">
                  {candidateInfo.fullName}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {candidateInfo.title}
                </Typography>
              </Box>

              <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                <Button
                  variant="contained"
                  startIcon={<FileText size={18} />}
                  href={candidateInfo.resume}
                  target="_blank"
                  sx={{ mr: 2 }}
                >
                  View Resume
                </Button>
                {candidateInfo.personalWebsite && (
                  <Button
                    variant="outlined"
                    startIcon={<Globe size={18} />}
                    href={candidateInfo.personalWebsite}
                    target="_blank"
                  >
                    Portfolio
                  </Button>
                )}
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
              <Chip
                icon={<Briefcase size={16} />}
                label={`${candidateInfo.experience} Years Experience`}
                variant="outlined"
              />
              <Chip
                icon={<GraduationCap size={16} />}
                label={candidateInfo.education}
                variant="outlined"
              />
              <Chip
                icon={<Flag size={16} />}
                label={profileInfo.nationality}
                variant="outlined"
              />
              <Chip
                icon={<MapPin size={16} />}
                label={contactInfo.address.split(",")[0]}
                variant="outlined"
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        {/* Right Column */}
        <Grid item xs={12} md={8}>
          {/* About Me */}
          <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
            >
              <User size={20} /> About Me
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="body1" paragraph>
              {profileInfo.biography}
            </Typography>
          </Paper>
        </Grid>
        {/* Left Column */}
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" gap={4}>
            {/* Contact Information */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <User size={20} /> Contact Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                <MapPinLine
                  size={20}
                  color="#666"
                  style={{ marginTop: 2, marginRight: 8 }}
                />
                <Typography variant="body2">{contactInfo.address}</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PhoneX size={20} color="#666" style={{ marginRight: 8 }} />
                <Typography variant="body2">{contactInfo.phone}</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <MdMail size={20} color="#666" style={{ marginRight: 8 }} />
                <Link href={`mailto:${contactInfo.email}`} underline="hover">
                  <Typography variant="body2">{contactInfo.email}</Typography>
                </Link>
              </Box>

              {candidateInfo.personalWebsite && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <BsGlobe size={20} color="#666" style={{ marginRight: 8 }} />
                  <Link
                    href={candidateInfo.personalWebsite}
                    target="_blank"
                    underline="hover"
                  >
                    <Typography variant="body2">Personal Website</Typography>
                  </Link>
                </Box>
              )}
            </Paper>

            {/* Personal Information */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <User size={20} /> Personal Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Nationality
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {profileInfo.nationality}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Gender
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {profileInfo.gender.charAt(0).toUpperCase() +
                      profileInfo.gender.slice(1)}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Marital Status
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {profileInfo.maritalStatus.charAt(0).toUpperCase() +
                      profileInfo.maritalStatus.slice(1)}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Education & Experience */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <GraduationCap size={20} /> Education & Experience
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Education
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {candidateInfo.education}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Experience
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {candidateInfo.experience}{" "}
                  {candidateInfo.experience === 1 ? "Year" : "Years"}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
