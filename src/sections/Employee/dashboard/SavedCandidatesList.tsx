import { Stack } from "@mui/material";
import { SavedCandidatesCard } from "../../../components/SavedCandidatesCard";

const SavedCandidatesList = () => {
  const savedCandidates = [
    { id: 1, name: "John Doe", profileImg: "https://via.placeholder.com/50" },
    {
      id: 2,
      name: "Jane Smith",
      profileImg: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "Michael Johnson",
      profileImg: "https://via.placeholder.com/50",
    },
    {
      id: 4,
      name: "Emily Davis",
      profileImg: "https://via.placeholder.com/50",
    },
    {
      id: 5,
      name: "Daniel Brown",
      profileImg: "https://via.placeholder.com/50",
    },
    {
      id: 6,
      name: "Sophia Wilson",
      profileImg: "https://via.placeholder.com/50",
    },
    {
      id: 7,
      name: "James Anderson",
      profileImg: "https://via.placeholder.com/50",
    },
    {
      id: 8,
      name: "Olivia Thomas",
      profileImg: "https://via.placeholder.com/50",
    },
    {
      id: 9,
      name: "William Martinez",
      profileImg: "https://via.placeholder.com/50",
    },
    {
      id: 10,
      name: "Ava Hernandez",
      profileImg: "https://via.placeholder.com/50",
    },
  ];

  return (
    <Stack spacing={2} p={3}>
      {savedCandidates.map((candidate) => (
        <SavedCandidatesCard
          key={candidate.id}
          name={candidate.name}
          profileImg={candidate.profileImg}
        />
      ))}
    </Stack>
  );
};

export default SavedCandidatesList;
