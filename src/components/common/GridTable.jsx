/**
 * @fileoverview Data grid table component using MUI X DataGrid for large datasets.
 */

import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

/**
 * GridTable component - Renders a reusable MUI DataGrid with pagination and sorting.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of row objects to display
 * @param {Array} props.columns - Column configuration array
 * @param {string} props.title - Optional title to display above the grid
 * @returns {React.ReactElement} MUI DataGrid component wrapped in Paper
 *
 * @description
 * Renders a feature-rich data grid component with the following capabilities:
 * - Dynamic columns based on configuration
 * - Built-in pagination with configurable page sizes (5, 10, 25)
 * - Sortable columns
 * - Custom cell rendering support
 * - Automatic ID generation for rows
 * - Responsive flex layout
 */
const GridTable = ({ data, columns, title }) => {
  /**
   * Memoized rows with unique ID generation
   * Uses existing id, falls back to transactionId, then to index
   */
  const rows = useMemo(
    () =>
      (data ?? []).map((row, index) => ({
        id: row.id ?? row.transactionId ?? `${index}`, // ensure unique id
        ...row,
      })),
    [data],
  );

  /**
   * Memoized grid columns with standardized configuration
   * Adds renderCell function if custom render is provided
   */
  const gridColumns = useMemo(
    () =>
      columns.map(({ field, headerName, align = "left", render }) => ({
        /** Field name from the row data */
        field,
        /** Column header text */
        headerName,
        /** Column width flex value */
        flex: 1,
        /** Cell text alignment */
        align,
        /** Header text alignment */
        headerAlign: align,
        /** Enable sorting for this column */
        sortable: true,
        /**
         * Custom cell render function
         * Provides cell value and full row data to the render function
         */
        renderCell: render
          ? (params) => render(params.value, params.row)
          : undefined,
      })),
    [columns],
  );

  return (
    <Paper
      elevation={3}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        p: 2,
      }}
    >
      {title && (
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}

      <div style={{ flex: 1 }}>
        <DataGrid
          rows={rows}
          columns={gridColumns}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          sx={{
            border: "none",
          }}
        />
      </div>
    </Paper>
  );
};

GridTable.propTypes = {
  /**
   * Optional title to display above the grid
   */
  title: PropTypes.string,
  /**
   * Array of row objects to display in the grid
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Column configuration array with field, headerName, alignment, and optional render function
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Field name from the row data
       */
      field: PropTypes.string.isRequired,
      /**
       * Column header text to display
       */
      headerName: PropTypes.string.isRequired,
      /**
       * Cell text alignment: 'left', 'right', or 'center'
       */
      align: PropTypes.oneOf(["left", "right", "center"]),
      /**
       * Optional custom cell renderer function that receives (value, row) parameters
       */
      render: PropTypes.func,
    }),
  ).isRequired,
};

export default memo(GridTable);
