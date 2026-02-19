/**
 * @fileoverview Rewards table component wrapping DynamicTable with error boundary.
 */

import { memo } from "react";
import PropTypes from "prop-types";
import { Alert } from "@mui/material";
import ErrorBoundary from "../common/ErrorBoundary";
import DynamicTable from "../common/DynamicTable";

/**
 * RewardsTable component - Displays rewards data with error handling.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of reward data objects
 * @param {string} props.title - Table title
 * @param {Array} props.columns - Column configuration array
 * @param {string} [props.errorFallBack] - Error message to display on failure
 * @returns {React.ReactElement} Table with error boundary wrapper
 *
 * @description
 * Wraps the DynamicTable component with an ErrorBoundary to catch and display
 * any errors that occur while rendering the table. Provides a fallback alert
 * message if an error occurs.
 */
const RewardsTable = ({
  data,
  title,
  columns,
  errorFallBack = "Failed to load data",
  isDateSearchable = false,
  searchableDateField = undefined,
}) => {
  return (
    <ErrorBoundary fallback={<Alert severity="error">{errorFallBack}</Alert>}>
      <DynamicTable
        title={title}
        data={data}
        columns={columns}
        isDateSearchable={isDateSearchable}
        searchableDateField={searchableDateField}
      />
    </ErrorBoundary>
  );
};

RewardsTable.propTypes = {
  /**
   * Array of reward data objects to display in the table
   */
  data: PropTypes.array.isRequired,
  /**
   * Title text to display above the table
   */
  title: PropTypes.string,
  /**
   * Column configuration array for the table
   */
  columns: PropTypes.array,
  /**
   * Error message to display in the fallback alert
   */
  errorFallBack: PropTypes.string,
  isDateSearchable: PropTypes.bool,
  searchableDateField: PropTypes.string,
};

export default memo(RewardsTable);
