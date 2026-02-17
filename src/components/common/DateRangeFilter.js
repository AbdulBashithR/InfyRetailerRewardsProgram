import { useState } from "react";
import PropTypes from "prop-types";
import DateRangeIcon from "@mui/icons-material/DateRange";
import {
  IconButton,
  Popover,
  Box,
  TextField,
  Button,
  Stack,
  Tooltip,
} from "@mui/material";
import Badge from "@mui/material/Badge";

/**
 * DateRangePopover Component
 * Displays a date icon that opens a popover with start and end date filters.
 */
const DateRangePopover = ({ onApply, initialStartDate, initialEndDate }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [startDate, setStartDate] = useState(initialStartDate || "");
  const [endDate, setEndDate] = useState(initialEndDate || "");

  const open = Boolean(anchorEl);

  // Show dot only when a start date is selected

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    if (onApply) {
      onApply({ startDate: "", endDate: "" });
    }
    setAnchorEl(null);
  };

  const handleApply = () => {
    if (onApply) {
      onApply({ startDate, endDate });
    }
    handleClose();
  };

  return (
    <>
      <Tooltip title="Filter by date range">
        <Badge
          color="secondary"
          overlap="circular"
          variant="dot"
          invisible={!startDate && !endDate}
        >
          <IconButton
            color="inherit"
            onClick={handleOpen}
            aria-label="date-range-filter"
          >
            <DateRangeIcon />
          </IconButton>
        </Badge>
      </Tooltip>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ p: 2, width: 280 }}>
          <Stack spacing={2}>
            <TextField
              label="Start Date"
              type="date"
              size="small"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              label="End Date"
              type="date"
              size="small"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button variant="outlined" size="small" onClick={handleReset}>
                Reset
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleApply}
                disabled={!startDate && !endDate}
              >
                Apply
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Popover>
    </>
  );
};

DateRangePopover.propTypes = {
  onApply: PropTypes.func,
  initialStartDate: PropTypes.string,
  initialEndDate: PropTypes.string,
};

DateRangePopover.defaultProps = {
  onApply: null,
  initialStartDate: "",
  initialEndDate: "",
};

export default DateRangePopover;
