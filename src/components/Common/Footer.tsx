import {
  Box,
  Grid,
  List,
  Stack,
  Typography,
  Divider,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Suitcase } from "phosphor-react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Box bgcolor="#000" color="white" py={5} px={3}>
      {/* Main Grid Container */}
      <Grid container spacing={8} justifyContent="center">
        {/* Logo & Contact Section */}
        <Grid>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Suitcase size={24} weight="bold" />
              <Typography variant="h6" fontWeight={700}>
                Jobpilot
              </Typography>
            </Stack>
            <Typography variant="body2" color="gray">
              Call now: <span style={{ color: "white" }}>(319) 555-0115</span>
            </Typography>
            <Typography variant="body2" color="gray">
              6391 Elgin St. Celina, Delaware 10299, New York, United States of
              America
            </Typography>
          </Stack>
        </Grid>

        {/* Quick Links Section */}
        <Grid>
          <Box textAlign={{ xs: "center", md: "left" }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Quick Links
            </Typography>
            <List dense>
              {["About", "Contact", "Pricing", "Blog"].map((item) => (
                <ListItemButton key={item} sx={{ py: 0.5 }}>
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{ color: "gray" }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Grid>

        {/* Candidate Section */}
        <Grid>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Candidate
          </Typography>
          <List dense>
            {["Find Jobs", "Upload Resume", "Job Alerts", "Career Advice"].map(
              (item) => (
                <ListItemButton key={item} sx={{ py: 0.5 }}>
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{ color: "gray" }}
                  />
                </ListItemButton>
              )
            )}
          </List>
        </Grid>

        {/* Employers Section */}
        <Grid>
          <Box textAlign={{ xs: "center", md: "left" }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Employers
            </Typography>
            <List dense>
              {[
                "Post a Job",
                "Company Profiles",
                "Pricing",
                "Hiring Advice",
              ].map((item) => (
                <ListItemButton key={item} sx={{ py: 0.5 }}>
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{ color: "gray" }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Grid>

        {/* Support Section */}
        <Grid>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Support
          </Typography>
          <List dense>
            {[
              "Help Center",
              "Privacy Policy",
              "Terms of Use",
              "Contact Us",
            ].map((item) => (
              <ListItemButton key={item} sx={{ py: 0.5 }}>
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{ color: "gray" }}
                />
              </ListItemButton>
            ))}
          </List>
        </Grid>
      </Grid>

      {/* Divider & Copyright */}
      <Divider sx={{ my: 4, backgroundColor: "gray" }} />
      <Typography variant="body2" color="gray" textAlign="center">
        © {new Date().getFullYear()} Jobpilot. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
