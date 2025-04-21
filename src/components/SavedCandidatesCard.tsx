import { ArrowForward } from "@mui/icons-material";
import { Button, Icon, Stack, Typography } from "@mui/material";
import { FaBookmark } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

export const SavedCandidatesCard = ({
  name,
  profileImg,
}: {
  name: string;
  profileImg: string;
}) => {
  return (
    <Stack
      direction={"row"}
      p={2}
      alignItems={"center"}
      justifyContent={"space-between"}
      border={"1px solid #ddd"}
      borderRadius={2}
      mb={2}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <img src={profileImg} alt={name} style={{ borderRadius: "50%" }} />
        <Typography variant="h6">{name}</Typography>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Icon>
          <FaBookmark />
        </Icon>
        <Button variant="contained">
          View Profile <ArrowForward />
        </Button>
        <Icon>
          <BsThreeDotsVertical />
        </Icon>
      </Stack>
    </Stack>
  );
};
