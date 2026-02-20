/**
 * @fileoverview Rewards table component wrapping DynamicTable with error boundary.
 */

import { memo } from "react";
import PropTypes from "prop-types";
import { Alert } from "@mui/material";
import ErrorBoundary from "../common/ErrorBoundary";
import GridTable from "../common/GridTable";

/**

 * @param {Object} props - Component props
 * @param {Array} props.data - Array of reward data objects
 * @param {string} props.title - Table title
 * @param {Array} props.columns - Column configuration array
 * @param {string} [props.errorFallBack] - Error message to display on failure
 * @param {boolean} [props.isDateSearchable] - Flag to enable date search functionality
 * @param {string} [props.searchableDateField] - Field name to use for date searching
 * @returns {React.ReactElement} Table with error boundary wrapper
 */
const GridRewardsTable = ({
  data,
  title,
  columns,
  errorFallBack = "Failed to load data",
  isDateSearchable = false,
  searchableDateField = undefined,
}) => (
  <ErrorBoundary fallback={<Alert severity="error">{errorFallBack}</Alert>}>
    <GridTable
      title={title}
      data={data}
      columns={columns}
      isDateSearchable={isDateSearchable}
      searchableDateField={searchableDateField}
    />
  </ErrorBoundary>
);

GridRewardsTable.propTypes = {
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
  /**
   * Flag to enable date search functionality in the table
   */
  isDateSearchable: PropTypes.bool,
  /**
   * Field name to use for date searching when isDateSearchable is true
   */
  searchableDateField: PropTypes.string,
};

export default memo(GridRewardsTable);
