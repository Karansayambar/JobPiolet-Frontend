import { styled } from "@mui/material/styles";

interface SearchIconWrapperProps {
  children?: React.ReactNode;
}
const SearchIconWrapper = styled("div")<SearchIconWrapperProps>(
  ({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  })
);

export default SearchIconWrapper;
