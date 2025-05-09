import Pagination, {
  PaginationProps,
  PaginationRenderItemParams,
} from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type CustomIconsProps = {
  count: number;
  page: number;
  onChange: PaginationProps["onChange"];
};

export default function CustomIcons({
  count,
  page,
  onChange,
}: CustomIconsProps) {
  return (
    <Stack spacing={2} alignItems={"center"} p={10}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        renderItem={(item: PaginationRenderItemParams) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
