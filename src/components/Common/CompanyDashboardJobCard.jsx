import { PiCurrencyDollarThin } from "react-icons/pi";
import {
  Button,
  Stack,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { dateConverter } from "../../utils/dateConverter";
import { useNavigate } from "react-router-dom";

const getStatusColor = (status) => {
  switch (status) {
    case "open":
      return "success.main";
    case "closed":
      return "error.main";
    default:
      return "text.secondary";
  }
};

const DashboardJobCard = ({ jobs }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  console.log("job details", jobs);

  return (
    <>
      {jobs?.map((job) => (
        <TableRow key={job._id}>
          <TableCell>
            <Stack direction="row" alignItems="center" gap={2}>
              <Stack>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography fontWeight="bold">{job.jobTitle}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography
                      variant="body2"
                      color={theme.palette.text.secondary}
                    >
                      {job.workMode}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <PiCurrencyDollarThin size={20} />
                    <Typography
                      variant="body2"
                      color={theme.palette.text.secondary}
                    >
                      {dateConverter(job.updatedAt)}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </TableCell>
          <TableCell>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography color={getStatusColor(job.jobStatus)}>
                {job.jobStatus}
              </Typography>
            </Stack>
          </TableCell>
          <TableCell>
            <Typography>
              {job.applicants.length > 0 ? job.applicants.length : 0}
            </Typography>
          </TableCell>
          <TableCell>
            <Button
              style={{ color: theme.palette.text.main }}
              onClick={() => navigate(`/company/viewApplicants/${job._id}`)}
              variant="contained"
            >
              View Applicants
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default DashboardJobCard;
