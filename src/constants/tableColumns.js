/**
 * @fileoverview Table column configurations for displaying rewards and transaction data.
 * Defines column structures for different table views used throughout the application.
 */

/**
 * Array of month names for converting numeric months to display names
 * @type {Array<string>}
 */
export const MONTH_NAMES = [
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

// Default locale and currency settings for price formatting
export const DEFAULT_LOCALE = "en-US";
export const DEFAULT_CURRENCY = "USD";
export const PRICE_DECIMALS = 2;

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
    field: "monthDate",
    headerName: "Month",
    render: (params) =>
      params.toLocaleString("en-US", { month: "long" }) +
      ` ${params?.getFullYear()}`,
  },
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
    field: "price",
    headerName: "Price",
    align: "right",
    render: (value) => {
      if (value === null || value === undefined || value === "") return "-";
      const num = Number(value);
      if (Number.isNaN(num)) return String(value);
      return new Intl.NumberFormat(DEFAULT_LOCALE, {
        style: "currency",
        currency: DEFAULT_CURRENCY,
        minimumFractionDigits: PRICE_DECIMALS,
        maximumFractionDigits: PRICE_DECIMALS,
      }).format(num);
    },
  },
  {
    field: "rewardPoints",
    headerName: "Reward Points",
    align: "right",
  },
];
