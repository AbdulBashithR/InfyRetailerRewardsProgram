/**
 * @fileoverview Layout component that provides the main application structure.
 */

//Package imports
import { Outlet } from "react-router-dom";

//Third Party Component imports
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Alert,
} from "@mui/material";

//Component imports
import ErrorBoundary from "./common/ErrorBoundary";

/**
 * Layout component - Main application layout with AppBar and Drawer.
 *
 * @component
 * @returns {React.ReactElement} Layout wrapper with content outlet
 *
 */
const Layout = () => (
  <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <AutoGraphIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Retailer Rewards Program
        </Typography>
      </Toolbar>
    </AppBar>

    <Box sx={{ bgcolor: "#F5F7FA", width: "100%", flex: 1 }}>
      <ErrorBoundary
        fallback={
          <Alert severity="error">
            Something went wrong in the current view.
          </Alert>
        }
      >
        <Outlet />
      </ErrorBoundary>
    </Box>
  </Box>
);

export default Layout;
