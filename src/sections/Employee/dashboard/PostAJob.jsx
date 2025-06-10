import { Box, CircularProgress, Typography } from "@mui/material";
import JobPostForm from "./forms/JobPostForm";
import { useEffect } from "react";
import PlansPage from "./PlansPage";
import { useGetPaymentDetailsQuery } from "../../../services/paymentApi";

const PostAJob = () => {
  // Use the query with the correct type for response
  const { data, error, isLoading } = useGetPaymentDetailsQuery();

  // Log the data for debugging purposes
  useEffect(() => {
    console.log("I am here");
    if (data) {
      console.log("Payment Details:", data);
    }
    console.log(data?.data?.status);
  }, [data]);

  const status = data?.data?.status;

  // Handle the loading state
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  // Handle the error state
  if (error) {
    const errorMessage = error?.message || "Error fetching payment details";
    return <Typography color="error">{errorMessage}</Typography>;
  }

  // Render the main content based on the payment status
  return (
    <Box>
      <Typography variant="h5">Post a Job</Typography>
      {status === "active" ? <JobPostForm /> : <PlansPage />}
    </Box>
  );
};

export default PostAJob;
