import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetPaymentDetailsQuery } from "../../../services/paymentApi";
import { dateConverter } from "../../../utils/dateConverter";

const PlansAndBillingPage = () => {
  const { data } = useGetPaymentDetailsQuery();
  const [paymentData, setpaymentData] = useState<any>({});

  useEffect(() => {
    console.log("Payment Details:", data?.data);
    setpaymentData(data?.data);
  }, [data]);

  const plan = data?.data;
  console.log("plan", plan);

  const getFormattedDatePlus30 = (dateString: string) => {
    console.log("i am working in getFormatedDataPlus30");
    const date = new Date(dateString);
    console.log(date);
    date.setDate(date.getDate() + 30);
    return dateConverter(date); // assuming this formats your date
  };

  return (
    <Box p={4}>
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
                {paymentData?.planName || "No Plan"}
              </Typography>
              <Typography color="text.secondary" fontSize={16}>
                You are subscribed to the {paymentData?.planName || "free"}{" "}
                plan.
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
                {paymentData.price}.00 USD
              </Typography>
              <Typography fontSize={18}>
                {paymentData.createdAt
                  ? getFormattedDatePlus30(paymentData.createdAt)
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
              {paymentData?.features?.map((el, index) => (
                <Typography key={index} variant="body2">
                  ✔ {el}
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
