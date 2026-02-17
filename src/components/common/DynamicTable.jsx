//Package imports
import { memo, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Typography,
  TableSortLabel,
} from "@mui/material";
import { sortData } from "../../utils/sortUtils";

/**
 * @fileoverview Dynamic table component that renders tables based on provided data and column configuration.
 */

/**
 * DynamicTable component - Renders a reusable, configurable table.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of row objects to display
 * @param {Array} props.columns - Column configuration array
 * @param {string} props.title - Optional title to display above the table
 * @returns {React.ReactElement} MUI Table component wrapped in Paper
 *
 * @description
 * Renders a flexible table component with the following features:
 * - Dynamic table structure based on column configuration
 * - Sticky header for scrollable tables
 * - Custom cell rendering support via render function
 * - Text alignment options per column
 * - Empty state display when no data is provided
 *
 */
const DynamicTable = ({ data = [], columns, title = "Table" }) => {
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState("asc");

  const handleSort = (columnKey) => {
    if (!columnKey) return;

    const isAsc = orderBy === columnKey && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(columnKey);
  };

  const sortedData = useMemo(
    () => sortData(data, orderBy, order),
    [data, orderBy, order],
  );
  return (
    <Paper
      elevation={3}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
      }}
    >
      {title && (
        <Typography variant="h6" sx={{ p: 2 }}>
          {title}
        </Typography>
      )}

      <TableContainer sx={{ flex: 1, overflow: "auto" }}>
        <Table stickyHeader aria-label="dynamic table">
          <TableHead>
            <TableRow>
              {columns.map(({ field, headerName, align = "left" }) => (
                <TableCell key={field} align={align}>
                  <TableSortLabel
                    active={orderBy === field}
                    direction={orderBy === field ? order : "asc"}
                    onClick={() => handleSort(field)}
                  >
                    {headerName}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {!data?.length ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((row, rowIndex) => (
                <TableRow key={row.id ?? rowIndex}>
                  {columns.map(({ field, align = "left", render }) => (
                    <TableCell key={field} align={align}>
                      {render ? render(row[field], row) : (row[field] ?? "-")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

DynamicTable.propTypes = {
  /**
   * Optional title to display above the table
   */
  title: PropTypes.string,
  /**
   * Array of row objects to display in the table
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Column configuration array with field, headerName, alignment, and optional render function
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Field name from the data object
       */
      field: PropTypes.string.isRequired,
      /**
       * Header text to display for this column
       */
      headerName: PropTypes.string.isRequired,
      /**
       * Text alignment: 'left', 'right', or 'center'
       */
      align: PropTypes.oneOf(["left", "right", "center"]),
      /**
       * Optional custom cell renderer function that receives (value, row) parameters
       */
      render: PropTypes.func,
    }),
  ).isRequired,
};

export default memo(DynamicTable);
