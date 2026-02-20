import { useCallback, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, Typography } from "@mui/material";
import {
  CardHeadignStyles,
  HeaderActionBoxStyles,
  TableHeaderStyles,
} from "../../styles";
import { filterByDateRange } from "../../utils/filterUtils";

import DateRangePopover from "./DateRangeFilter";
import SearchField from "./SearchField";

export const TableHeader = ({
  data,
  setData,
  columns,
  title = "Table",
  isDateSearchable,
  searchableDateField,
}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const handleSearch = useCallback((term) => {
    setSearchQuery(term);
  }, []);
  const handleDateFilter = useCallback(({ startDate, endDate }) => {
    setDateRange({ startDate, endDate });
  }, []);

  useEffect(() => {
    if (!searchQuery && !dateRange.startDate && !dateRange.endDate)
      return setData(data);

    let filtered = data;

    if (searchQuery) {
      const lowerTerm = searchQuery.toLowerCase();
      filtered = filtered.filter((row) =>
        columns.some(({ field }) =>
          String(row[field] ?? "")
            .toLowerCase()
            .includes(lowerTerm),
        ),
      );
    }

    if (dateRange.startDate || dateRange.endDate) {
      filtered = filterByDateRange(
        filtered,
        dateRange.startDate,
        dateRange.endDate,
        searchableDateField,
      );
    }

    setData(filtered);
  }, [data, setData, searchQuery, columns, dateRange, searchableDateField]);

  return (
    <Box sx={TableHeaderStyles}>
      <Typography variant="h6" sx={CardHeadignStyles}>
        {title}
      </Typography>
      <Box sx={HeaderActionBoxStyles}>
        {isSearchVisible ? (
          <SearchField
            onSearch={handleSearch}
            delay={400}
            onClear={() => setIsSearchVisible(false)}
          />
        ) : (
          <IconButton onClick={() => setIsSearchVisible((prev) => !prev)}>
            <SearchIcon />
          </IconButton>
        )}
        {isDateSearchable && <DateRangePopover onApply={handleDateFilter} />}
      </Box>
    </Box>
  );
};
