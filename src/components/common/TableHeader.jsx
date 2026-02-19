import { Box, IconButton, Typography } from "@mui/material";
import SearchField from "./SearchField";
import DateRangePopover from "./DateRangeFilter";
import { useCallback, useEffect, useMemo, useState } from "react";
import { filterByDateRange } from "../../utils/filterUtils";
import SearchIcon from "@mui/icons-material/Search";

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
  }, [data, searchQuery, columns, dateRange, searchableDateField]);

  return (
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
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1,
        }}
      >
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
