/**
 * @fileoverview Layout component that provides the main application structure.
 */

//Package imports
import { useState } from "react";
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
import DateRangePopover from "./common/DateRangeFilter";
import ErrorBoundary from "./common/ErrorBoundary";

/**
 * Layout component - Main application layout with AppBar and Drawer.
 *
 * @component
 * @returns {React.ReactElement} Layout wrapper with content outlet
 *
 */
const Layout = () => {
  const [filterDate, setFilterDate] = useState(null);
  const onApplyDateFilter = (dates) => {
    setFilterDate(dates);
  };
  return (
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DateRangePopover
              onApply={onApplyDateFilter}
              initialStartDate={filterDate?.startDate || ""}
              initialEndDate={filterDate?.endDate || ""}
            />
          </Box>
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
          <Outlet context={filterDate} />
        </ErrorBoundary>
      </Box>
    </Box>
  );
};

export default Layout;
