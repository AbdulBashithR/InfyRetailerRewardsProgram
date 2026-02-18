/**
 * @fileoverview Navigation drawer component for app-wide navigation.
 */

//Package imports
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

/**
 * CommonDrawer component - Navigation drawer with dynamic links and active route highlighting.
 *
 * @component
 * @param {boolean} open - Whether the drawer is open
 * @param {Function} onClose - Callback to close the drawer
 * @param {Array} navLinks - Navigation links configuration
 * @returns {React.ReactElement} MUI Drawer component with navigation items
 *
 * @description
 * Renders a navigation drawer with the following features:
 * - Dynamic navigation links from props
 * - Highlights the currently active link based on the current route
 * - Closes the drawer when a link is clicked
 * - Navigates to the selected path
 */
export const CommonDrawer = ({ open, onClose, navLinks }) => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Handle navigation to a specific path and close the drawer
   * @param {string} path - The path to navigate to
   */
  const handleNav = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Rewards View
      </Typography>
      <Box sx={{ width: 250 }}>
        <List>
          {navLinks.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleNav(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

CommonDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  navLinks: PropTypes.array.isRequired,
};
