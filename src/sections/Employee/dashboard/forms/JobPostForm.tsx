import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import FormProvider from "../../../../hooks/hooks-form/FormProvider";
import RHFTextField from "../../../../hooks/hooks-form/RHFTextField";
import RHFSelect from "../../../../hooks/hooks-form/RHFSelect";
import RHFTextArea from "../../../../hooks/hooks-form/TextArea";
import RHFDatePicker from "../../../../hooks/hooks-form/RHFDatePicker";
import { ArrowForward } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import RHFTagInput from "../../../../hooks/hooks-form/RHFTagInput";
import { useCreateJobPostMutation } from "../../../../services/jobsApi";
import {
  allBenifits,
  cityOptions,
  countries,
  industryOptions,
  jobFunctionOptions,
  languages,
  stateOptions,
  workingHourOptions,
} from "../../../../utils/data";
import RHFMultiSelect from "../../../../hooks/hooks-form/RHFMultiSelect";

type JobPostFormValues = {
  jobTitle: string;
  tags: string[];
  jobRole: string;
  minSalary: string;
  maxSalary: string;
  salaryType: string;
  education: string;
  experience: string;
  jobType: string;
  vacancies: string;
  expirationDate: string;
  jobLevel: string;
  country: string;
  city: string;
  jobBenefits: string[];
  jobDescription: string;
  industry: string;
  workMode: string;
  jobFunction: string;
  workingHours: string;
  leavePolicy: string;
  contractLength: string;
  joiningDate: string;
  applicationDeadline: string;
  slug: string;
  status: string;
  state: string;
};

const JobPostForm = () => {
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [createJobPost, { isLoading }] = useCreateJobPostMutation();

  const methods = useForm<JobPostFormValues>({
    defaultValues: {
      jobTitle: "",
      tags: [],
      jobRole: "",
      minSalary: "",
      maxSalary: "",
      salaryType: "",
      education: "",
      experience: "",
      jobType: "",
      vacancies: "",
      expirationDate: "",
      jobLevel: "",
      country: "",
      city: "",
      state: "",
      jobBenefits: selectedBenefits,
      jobDescription: "",
      industry: "",
      workMode: "",
      jobFunction: "",
      workingHours: "",
      leavePolicy: "",
      contractLength: "",
      joiningDate: "",
      applicationDeadline: "",
      slug: "",
      status: "",
    },
  });

  const onSubmit = async (data: JobPostFormValues) => {
    console.log("Form Data:", data);
    try {
      const response = await createJobPost(data).unwrap();
      console.log("Job posted successfully:", response);
      methods.reset();
      setSelectedBenefits([]);
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  const handleToggle = (value: string) => {
    const updated = selectedBenefits.includes(value)
      ? selectedBenefits.filter((item) => item !== value)
      : [...selectedBenefits, value];
    setSelectedBenefits(updated);
    methods.setValue("jobBenefits", updated);
  };

  return (
    <Box>
      <Stack>
        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Typography variant="h6" gutterBottom>
            Basic Job Info
          </Typography>

          <Stack direction={"row"} gap={2} py={2}>
            <RHFTextField name="jobTitle" label="Job Title" required />
            <RHFTextField name="jobRole" label="Job Role" required />{" "}
            <RHFTextField name="companyName" label="Company Name" required />
          </Stack>

          <Stack direction={"row"} gap={2} py={2}>
            <RHFTextField name="minSalary" label="Minimum Salary" required />
            <RHFTextField name="maxSalary" label="Maximum Salary" required />
            <RHFSelect
              name="salaryType"
              label="Salary Type"
              required
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "yearly", label: "Yearly" },
                { value: "hourly", label: "Hourly" },
              ]}
            />
          </Stack>

          <Stack direction={"row"} gap={2} py={2}>
            <RHFSelect
              name="education"
              label="Education"
              required
              options={[
                { value: "highschool", label: "High School Diploma" },
                { value: "diploma", label: "Diploma" },
                { value: "bachelors", label: "Bachelor's Degree" },
                { value: "contentwriting", label: "Content Writing" },
                { value: "btech", label: "B.Tech / B.E." },
                { value: "masters", label: "Master's Degree" },
                { value: "mtech", label: "M.Tech / M.E." },
                { value: "mba", label: "MBA" },
                { value: "phd", label: "Ph.D" },
                { value: "other", label: "Other" },
              ]}
            />
            <RHFSelect
              name="experience"
              label="Experience (in years)"
              required
              options={[
                { value: "0", label: "Fresher (0 years)" },
                { value: "1", label: "1 year" },
                { value: "2", label: "2 years" },
                { value: "3", label: "3 years" },
                { value: "4", label: "4 years" },
                { value: "5", label: "5 years" },
                { value: "6", label: "6 years" },
                { value: "7", label: "7 years" },
                { value: "8", label: "8 years" },
                { value: "9", label: "9 years" },
                { value: "10+", label: "10+ years" },
              ]}
            />
            <RHFTextField
              name="vacancies"
              label="Number of Vacancies"
              required
            />
          </Stack>

          <Stack py={4}>
            <Typography variant="h6" gutterBottom>
              Addditional Details
            </Typography>
            <Stack direction={"row"} gap={2} py={2}>
              <RHFSelect
                name="workMode"
                label="Work Mode"
                required
                options={[
                  { label: "Part-Time", value: "Part-time" },
                  { label: "Full-Time", value: "Full-time" },
                  { label: "Remote", value: "Remote" },
                  { label: "Hybrid (Remote + Office)", value: "Hybrid" },
                ]}
              />
              <RHFSelect
                name="jobLevel"
                label="Job Level"
                required
                options={[
                  { value: "entry", label: "Entry" },
                  { value: "mid", label: "Mid" },
                  { value: "senior", label: "Senior" },
                ]}
              />
            </Stack>

            <Stack direction={"row"} alignItems={"center"} gap={2}>
              <RHFSelect
                name="industry"
                label="Industry"
                options={industryOptions}
              />
              <RHFSelect
                name="status"
                label="Job Status"
                required
                options={[
                  { label: "Open", value: "open" },
                  { label: "Closed", value: "closed" },
                  { label: "Paused", value: "paused" },
                ]}
              />
            </Stack>

            <Stack direction={"row"} alignItems={"center"} gap={2} py={2}>
              <RHFSelect
                name="jobFunction"
                label="Job Function"
                options={jobFunctionOptions}
                required
              />
              <RHFSelect
                name="workingHours"
                label="Working Hours"
                required
                options={workingHourOptions}
              />
            </Stack>

            <Stack direction={"row"} alignItems={"center"} gap={2} py={2}>
              <RHFTextField
                name="contractLength"
                label="Contract Length"
                required
              />
              <RHFDatePicker
                name="joiningDate"
                label="Expected Joining Date"
                required
              />
              <RHFDatePicker
                name="applicationDeadline"
                label="Application Deadline"
                required
              />
            </Stack>
          </Stack>

          <Stack direction={"row"} alignItems={"center"} gap={2} py={2}>
            {/* <RHFTextField name="slug" label="Slug (SEO)" required /> */}
          </Stack>

          <Typography variant="h6" gutterBottom>
            Job BenefitsPost Job
          </Typography>
          <Stack direction="row" gap={2} py={2}>
            <Box display={"flex"} gap={1} flexWrap="wrap" mt={2}>
              {allBenifits.map((benefit) => (
                <Chip
                  key={benefit.value}
                  label={benefit.label}
                  color={
                    selectedBenefits.includes(benefit.value)
                      ? "primary"
                      : "default"
                  }
                  onClick={() => handleToggle(benefit.value)}
                  clickable
                />
              ))}
            </Box>
          </Stack>
          <Stack>
            <Typography>Skills</Typography>
            <RHFTagInput
              name="sills"
              label="Skills"
              required
              options={["React", "JavaScript", "Node.js", "CSS", "MongoDB"]}
            />
          </Stack>

          <Stack py={4}>
            <Typography variant="h6" gutterBottom>
              Location
            </Typography>
            <Stack direction={"row"} gap={2} py={2}>
              <RHFSelect
                name="country"
                label="Country"
                required
                options={countries}
              />
              <RHFSelect
                name="city"
                label="City"
                required
                options={cityOptions}
              />
              <RHFSelect
                name="state"
                label="State"
                required
                options={stateOptions}
              />
            </Stack>
            <RHFTextField name="address" label="Address" required />
          </Stack>
          <Stack py={3}>
            <Typography variant="h6" gutterBottom>
              Job Details
            </Typography>
            <Stack py={2} gap={4}>
              <RHFMultiSelect
                name="responsibilities"
                label="Job Responsibilities"
                placeholder="Enter responsibilities"
                options={[]}
                creatable // to allow custom entries
              />
              <RHFMultiSelect
                name="requirements"
                label="Must-Have Requirements"
                placeholder="Enter requirements"
                options={[]}
                creatable
              />
              <RHFMultiSelect
                name="preferences"
                label="Good-to-Have Preferences"
                placeholder="Enter preferences"
                options={[]}
                creatable
              />

              <RHFMultiSelect
                name="languagesRequired"
                label="Languages Required"
                placeholder="Select languages"
                options={languages}
              />
            </Stack>
          </Stack>

          <Typography variant="h6" gutterBottom>
            Job Description
          </Typography>
          <Stack py={2}>
            <RHFTextArea
              name="jobDescription"
              label="Describe the Job Role"
              required
              rows={5}
              placeholder="Explain the responsibilities, expectations, and role..."
            />
          </Stack>

          <Stack mt={3} direction="row" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              endIcon={<ArrowForward />}
              disabled={isLoading}
            >
              {isLoading ? "Posting..." : "Post Job"}
            </Button>
          </Stack>
        </FormProvider>
      </Stack>
    </Box>
  );
};

export default JobPostForm;
