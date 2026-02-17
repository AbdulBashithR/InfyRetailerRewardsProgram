/**
 * @fileoverview Table column configurations for displaying rewards and transaction data.
 * Defines column structures for different table views used throughout the application.
 */

/**
 * Array of month names for converting numeric months to display names
 * @type {Array<string>}
 */
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Column configuration for Monthly Rewards table
 * Displays customer monthly reward points aggregated by customer, month, and year
 * 
 * @type {Array<Object>}
 * @constant
 * 
 * @property {string} field - The data field name from the row object
 * @property {string} headerName - The header text to display
 * @property {string} [align] - Text alignment ('left', 'right', 'center')
 * @property {Function} [render] - Optional custom cell render function

 */
export const monthlyRewardsColumns = [
  { field: "customerId", headerName: "Customer ID" },
  { field: "customerName", headerName: "Customer Name" },
  {
    field: "month",
    headerName: "Month",
    render: (month) => MONTH_NAMES[month - 1] ?? month,
  },
  { field: "year", headerName: "Year" },
  {
    field: "monthlyRewardPoints",
    headerName: "Reward Points",
    align: "right",
  },
];

/**
 * Column configuration for Total Rewards table
 * Displays cumulative reward points for each customer across all time
 *
 * @type {Array<Object>}
 * @constant

 */
export const totalRewardsColumns = [
  { field: "customerName", headerName: "Customer Name" },
  {
    field: "totalRewardPoints",
    headerName: "Total Reward Points",
    align: "right",
  },
];

/**
 * Column configuration for Transactions table
 * Displays detailed information about each individual transaction
 *
 * @type {Array<Object>}
 * @constant
 *
 * @property {string} field - The data field name from the row object
 * @property {string} headerName - The header text to display
 * @property {string} [align] - Text alignment ('left', 'right', 'center')
 * @property {Function} [render] - Optional custom cell render function
 *

 */
export const transactionsColumns = [
  {
    field: "transactionId",
    headerName: "Transaction ID",
  },
  {
    field: "customerName",
    headerName: "Customer Name",
  },
  {
    field: "purchaseDate",
    headerName: "Purchase Date",
  },
  {
    field: "productPurchased",
    headerName: "Product Purchased",
  },
  {
    headerName: "Price",
    align: "right",
    render: (value) => value?.toFixed(2),
  },
  {
    field: "rewardPoints",
    headerName: "Reward Points",
    align: "right",
  },
];
