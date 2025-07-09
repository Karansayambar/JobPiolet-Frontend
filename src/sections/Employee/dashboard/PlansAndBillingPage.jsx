import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetPaymentDetailsQuery } from "../../../services/paymentApi";
import { dateConverter } from "../../../utils/dateConverter";

const PlansAndBillingPage = () => {
  const { data } = useGetPaymentDetailsQuery(); // TypeScript should now know the type of `data`
  const [paymentData, setPaymentData] = useState({});

  useEffect(() => {
    if (data?.data) {
      setPaymentData(data.data); // 'data' should now be correctly typed
    }
  }, [data]);

  const plan = paymentData; // Using the already destructured data

  // Formatting date and adding 30 days to it
  const getFormattedDatePlus30 = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 30);
    return dateConverter(date); // assuming this formats your date
  };

  // Formatting price as currency
  const formattedPrice = paymentData.price ? `${paymentData.price} USD` : "N/A";

  return (
    <Box py={8}>
      <Typography variant="h4" fontWeight={700} mb={4}>
        Plans & Billing
      </Typography>

      <Stack width={"50%"} spacing={4}>
        {/* Left Section */}
        <Stack flex={1} spacing={4}>
          {/* Current Plan */}
          <Box
            border={1}
            borderColor="grey.300"
            borderRadius={2}
            p={3}
            minHeight={200}
          >
            <Stack spacing={2}>
              <Typography variant="h6" fontSize={22}>
                Current Plan
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {plan?.planName || "No Plan"}
              </Typography>
              <Typography color="text.secondary" fontSize={16}>
                You are subscribed to the {plan?.planName || "free"} plan.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="contained">Change Plan</Button>
                <Button variant="outlined">Cancel Plan</Button>
              </Stack>
            </Stack>
          </Box>

          {/* Next Invoice */}
          <Box
            border={1}
            borderColor="grey.300"
            borderRadius={2}
            p={3}
            minHeight={200}
          >
            <Stack spacing={2}>
              <Typography variant="h6" fontSize={22}>
                Next Invoice
              </Typography>
              <Typography variant="h4" color="text.secondary">
                {formattedPrice}
              </Typography>
              <Typography fontSize={18}>
                {plan?.createdAt
                  ? getFormattedDatePlus30(plan.createdAt)
                  : "N/A"}
              </Typography>

              <Typography color="text.secondary" fontSize={16}>
                You will be charged this amount every month.
              </Typography>
              <Button variant="contained" endIcon={<ArrowForward />}>
                Pay Now
              </Button>
            </Stack>
          </Box>
        </Stack>

        {/* Right Section */}
        <Stack flex={1} spacing={4}>
          {/* Plan Benefits */}
          <Box
            border={1}
            borderColor="grey.300"
            borderRadius={2}
            p={3}
            minHeight={200}
          >
            <Stack spacing={2}>
              <Typography variant="h6" fontSize={22}>
                Plan Benefits
              </Typography>
              <Typography color="text.secondary" fontSize={16}>
                Enjoy premium features including:
              </Typography>
              {plan?.features?.map((feature, index) => (
                <Typography key={index} variant="body2">
                  ✔ {feature}
                </Typography>
              ))}

              <Stack direction="row" spacing={2}>
                <Button variant="contained">Upgrade</Button>
                <Button variant="outlined">Downgrade</Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PlansAndBillingPage;
