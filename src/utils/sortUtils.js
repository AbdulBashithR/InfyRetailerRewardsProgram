/**
 * Function to sort an array of objects based on a specified key and order.
 * Creates a new sorted array without modifying the original.
 * @param {Array<Object>} data - Array of objects to sort
 * @param {string|null} orderBy - Key to sort by
 * @param {'asc'|'desc'} order - Sort direction
 * @returns {Array<Object>} Sorted array (new copy)
 */
export const sortData = (data = [], orderBy, order = "asc") => {
  if (!orderBy) return data;

  return [...data].sort((a, b) => {
    const aValue = a?.[orderBy];
    const bValue = b?.[orderBy];

    if (aValue === bValue) return 0;

    if (typeof aValue === "number" && typeof bValue === "number") {
      return order === "asc" ? aValue - bValue : bValue - aValue;
    }

    return order === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });
};
