import { Stack, Typography } from "@mui/material";
import { SavedCandidatesCard } from "../../../components/SavedCandidatesCard";
import { useGetSavedCandidatesDetailsQuery } from "../../../services/companyApi";
import { useEffect, useState } from "react";
import { BookmarkSimple } from "phosphor-react";

const SavedCandidatesList = () => {
  const [savedCandidates, setCandidates] = useState([]);
  const { data, isLoading } = useGetSavedCandidatesDetailsQuery();

  useEffect(() => {
    if (data) {
      // setCandidates((prev) => [...prev, data.savedCandidateDetails]);
      setCandidates(data.savedCandidateDetails);
    }
  }, [data]);

  if (savedCandidates) {
    console.log("savedCandidates", savedCandidates);
  }

  return (
    <Stack spacing={2} p={4}>
      <Stack
        display={"flex"}
        direction={"row"}
        alignItems={"center"}
        gap={1}
        py={2}
      >
        <Typography fontSize={25}>Saved Candidates</Typography>
        <BookmarkSimple weight="fill" size={30} />
      </Stack>
      {savedCandidates?.map((candidate) => (
        <SavedCandidatesCard
          applicant={candidate}
          key={candidate._id}
          name={candidate.candidateInfo.fullName}
          profileImg={candidate.candidateInfo.avatar}
        />
      ))}
    </Stack>
  );
};

export default SavedCandidatesList;
