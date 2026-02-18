/**
 * @fileoverview Layout component that provides the main application structure.
 * Includes the top navigation bar, navigation drawer, and outlet for page content.
 */

//Package imports
import { useState } from "react";
import { Outlet } from "react-router-dom";

//Third Party Component imports
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
  Alert,
} from "@mui/material";

//Component imports
import { CommonDrawer } from "./common/Drawer";
import ErrorBoundary from "./common/ErrorBoundary";

/**
 * Navigation links configuration
 * @type {Array<{label: string, path: string, icon: React.ReactElement}>}
 */
const navLinks = [
  { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
  { label: "Detailed View", path: "/tabs", icon: <AutoGraphIcon /> },
];

/**
 * Layout component - Main application layout with AppBar and Drawer.
 *
 * @component
 * @returns {React.ReactElement} Layout wrapper with navigation and content outlet
 *
 * @description
 * Provides the main application structure with:
 * - Top AppBar with menu button and branding
 * - Navigation drawer with links to different pages
 * - Error boundary for error handling
 * - Outlet for nested routes
 */
const Layout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  /**
   * Opens the navigation drawer
   */
  const handleDrawerOpen = () => setDrawerOpen(true);

  /**
   * Closes the navigation drawer
   */
  const handleDrawerClose = () => setDrawerOpen(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Retailer Rewards Program
          </Typography>
          <Avatar sx={{ bgcolor: "secondary.main" }}>AB</Avatar>
        </Toolbar>
      </AppBar>
      <CommonDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        navLinks={navLinks}
      />

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
};

export default Layout;
