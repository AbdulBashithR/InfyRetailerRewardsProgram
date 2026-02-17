/**
 * @fileoverview 404 Not Found page component.
 */
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";
import {
  marginBottom2,
  marginTop2,
  NotFoundBoxStyles,
  NotFoundTypographyStyles,
} from "../styles";

/**
 * @returns {React.ReactElement} 404 error page with navigation option
 */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box sx={NotFoundBoxStyles}>
        <Typography variant="h1" sx={NotFoundTypographyStyles}>
          404
        </Typography>
        <Typography variant="h5" sx={marginBottom2}>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={marginTop2}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
