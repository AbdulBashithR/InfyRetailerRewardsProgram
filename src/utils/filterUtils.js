/**
 * Filters an array of objects based on a date range.
 *
 * @param {Array<Object>} data - Input array of objects
 * @param {string|Date|null} startDate - Start date (inclusive)
 * @param {string|Date|null} endDate - End date (inclusive)
 * @param {string} fieldBasedOn - Object key that contains the date value
 * @returns {Array<Object>} Filtered array
 */
export const filterByDateRange = (data, startDate, endDate, fieldBasedOn) => {
  if (!Array.isArray(data) || !fieldBasedOn) {
    return [];
  }

  const start = startDate ? new Date(startDate).getTime() : null;
  const end = endDate ? new Date(endDate).getTime() : null;

  return data.filter((item) => {
    const value = item?.[fieldBasedOn];
    if (!value) return false;

    const itemDate = new Date(value).getTime();

    if (start && end) {
      return itemDate >= start && itemDate <= end;
    }

    if (start && !end) {
      return itemDate >= start;
    }

    if (!start && end) {
      return itemDate <= end;
    }

    return true;
  });
};
