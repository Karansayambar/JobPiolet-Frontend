import { Box, Typography } from "@mui/material";
import JobPostForm from "./forms/JobPostForm";
import { useEffect } from "react";
import PlansPage from "./PlansPage";
import { useGetPaymentDetailsQuery } from "../../../services/paymentApi";

const PostAJob = () => {
  const { data, error, isLoading } = useGetPaymentDetailsQuery();

  useEffect(() => {
    console.log("I am here");
    console.log("data", data);
    if (data) {
      console.log("Payment Details:", data);
    }
    console.log(data?.data?.status);
  }, [data]);
  const status = data?.data?.status;

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error fetching payment details</Typography>;

  return (
    <Box>
      <Typography>Post a job</Typography>
      {status === "active" ? <JobPostForm /> : <PlansPage />}
    </Box>
  );
};

export default PostAJob;
