import { PiCurrencyDollarThin } from "react-icons/pi";
import { Button, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { dateConverter } from "../../utils/dateConverter";
import { useNavigate } from "react-router-dom";

interface Job {
  id: number;
  title: string;
  dateApplied: string;
  applicants: string;
  status: "ActivPendinge" | "Pending" | "Expire";
  type: string;
}

const getStatusColor = (status: Job["status"]): string => {
  switch (status) {
    case "open":
      return "success.main";
    case "closed":
      return "error.main";
    default:
      return "text.secondary";
  }
};

const DashboardJobCard = ({ jobDetails }: { jobDetails: any }) => {
  console.log("job details", jobDetails);
  const navigate = useNavigate();

  return (
    <>
      {jobDetails.map((job: Job) => (
        <TableRow key={job.id}>
          <TableCell>
            <Stack direction="row" alignItems="center" gap={2}>
              <Stack>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography fontWeight="bold">{job.jobTitle}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography variant="body2">{job.workMode}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <PiCurrencyDollarThin size={20} />
                    <Typography variant="body2">
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
