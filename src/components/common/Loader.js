import { CircularProgress, Container } from "@mui/material";
import { LoaderBoxStyles } from "../../styles";

export const Loader = () => (
  <Container sx={LoaderBoxStyles}>
    <CircularProgress />
  </Container>
);
