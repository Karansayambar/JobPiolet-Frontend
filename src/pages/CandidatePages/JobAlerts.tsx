import { Stack, Table, TableBody, Typography } from "@mui/material";
import React from "react";
import DashboardJobCard from "../../components/Common/CandidateDashboardJobCard";

const JobAlerts: React.FC = () => {
  return (
    <Stack
      flex={4}
      bgcolor="background.paper"
      p={3}
      borderRadius={2}
      overflow="auto" // or "scroll"
      height="800px" // Set a specific height
      sx={{
        "&::-webkit-scrollbar": { display: "none" }, // Hides scrollbar in Webkit browsers
      }}
    >
      <Typography variant="body1" fontWeight={600} fontSize={18} py={3}>
        Job Alerts (9 new jobs)
      </Typography>
      <Table>
        <TableBody>
          <DashboardJobCard />
        </TableBody>
      </Table>
    </Stack>
  );
};

export default JobAlerts;
