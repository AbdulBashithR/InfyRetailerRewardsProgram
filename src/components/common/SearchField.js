import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

import { TextField, InputAdornment, IconButton } from "@mui/material";

/**
 * SearchField component with debounce support.
 *
 * @param {Function} props.onSearch - Callback triggered after debounce
 * @param {number} props.delay - Debounce delay in ms (default: 300)
 * @param {string} props.placeholder - Input placeholder text
 * @param {Function} props.onClear - Callback triggered when the clear button is clicked
 */
const SearchField = ({
  onSearch,
  delay = 300,
  placeholder = "Search...",
  onClear = () => {},
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay, onSearch]);

  const handleClear = () => {
    setValue("");
    onSearch("");
    onClear();
  };

  return (
    <TextField
      size="small"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      autoFocus
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton size="small" onClick={handleClear}>
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

SearchField.propTypes = {
  onSearch: PropTypes.func.isRequired,
  delay: PropTypes.number,
  placeholder: PropTypes.string,
};

export default SearchField;
