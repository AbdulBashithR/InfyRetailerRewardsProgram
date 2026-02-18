/**
 * @fileoverview 404 Not Found page component.
 */

import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * @returns {React.ReactElement} 404 error page with navigation option
 */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
          textAlign: "center",
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "4rem", fontWeight: "bold" }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
