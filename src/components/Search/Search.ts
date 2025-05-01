import { styled } from "@mui/material/styles";

interface SearchProps {
  children?: React.ReactNode;
}

const Search = styled("div")<SearchProps>({
  position: "relative",
  borderRadius: 20,
  marginLeft: 0,
  width: "100%",
});

export default Search;
