//Package imports
import { memo, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
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
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";

import { sortData } from "../../utils/sortUtils";
import SearchField from "./SearchField";

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
const DynamicTable = ({ data = null, columns, title = "Table" }) => {
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState("asc");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((term) => {
    setSearchQuery(term);
  }, []);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    const lowerTerm = searchQuery.toLowerCase();
    return data.filter((row) =>
      columns.some(({ field }) =>
        String(row[field] ?? "")
          .toLowerCase()
          .includes(lowerTerm),
      ),
    );
  }, [data, searchQuery, columns]);

  const handleSort = (columnKey) => {
    if (!columnKey) return;

    const isAsc = orderBy === columnKey && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(columnKey);
  };

  const sortedData = useMemo(
    () => sortData(filteredData, orderBy, order),
    [filteredData, orderBy, order],
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
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography variant="h6">{title}</Typography>

          {isSearchVisible ? (
            <Box sx={{ px: 2 }}>
              <SearchField
                onSearch={handleSearch}
                delay={400}
                onClear={() => setIsSearchVisible(false)}
              />
            </Box>
          ) : (
            <IconButton onClick={() => setIsSearchVisible((prev) => !prev)}>
              <SearchIcon />
            </IconButton>
          )}
        </Box>
      )}

      <TableContainer sx={{ flex: 1, overflow: "auto", maxHeight: "100%" }}>
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
            {!sortedData ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <CircularProgress size={28} />
                </TableCell>
              </TableRow>
            ) : sortedData?.length === 0 ? (
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
