/**
 * @fileoverview Utility functions for calculating and aggregating reward points.
 * Provides functions to compute reward points based on purchase price and aggregate
 * rewards data by customer, month, and year.
 */

/**
 * Calculate reward points based on purchase price.
 *
 * Reward calculation rules:
 * - $0-$50: 0 points
 * - $51-$100: 1 point per dollar spent
 * - Over $100: 50 points for first $50 over $50 + 2 points per dollar for remaining amount
 *
 * @param {number} price - Purchase price in dollars
 * @returns {number} Calculated reward points
 *
 * @example
 * calculateRewardPoints(30);   // Returns 0
 * calculateRewardPoints(75);   // Returns 25 (75 - 50)
 * calculateRewardPoints(150);  // Returns 150 (50 + (150-100)*2)
 */
export const calculateRewardPoints = (price) => {
  const amount = Number(price);

  if (!Number.isFinite(amount) || amount < 0) return 0;
  if (price <= 50) return 0;
  if (price <= 100) return Math.floor(price - 50);
  return Math.floor(price - 100) * 2 + 50;
};

/**
 * Compute and append reward points to transaction data.
 * Transforms each transaction by calculating and adding a rewardPoints field.
 *
 * @param {Array<Object>} transactions - Array of transaction objects
 * @returns {Array<Object>} Transactions with computed rewardPoints field

 */
export const computeRewardsPointsForTransactions = (transactions) => {
  if (!Array.isArray(transactions)) return [];

  return transactions.map((t) => ({
    ...t,
    rewardPoints: calculateRewardPoints(t?.price ?? 0),
  }));
};

/**
 * Aggregate monthly rewards per customer.
 * Groups transactions by customer, month, and year, calculating total reward points for each group.
 * Results are sorted by year ascending, then by month ascending.
 *
 * @param {Array<Object>} transactions - Array of enriched transaction objects (with rewardPoints)
 * @returns {Array<Object>} Array of monthly reward aggregations
 *
 */
export const getMonthlyRewards = (transactions) => {
  /**
   * Map to store aggregated monthly rewards
   * Key format: "customerId-year-month"
   * @type {Object<string, Object>}
   */
  if (!Array.isArray(transactions)) return [];

  const map = transactions.reduce(
    (
      customerMonthlyRewards,
      { customerId, customerName, purchaseDate, rewardPoints },
    ) => {
      const date = new Date(purchaseDate);
      const monthNumber = date.getMonth() + 1;
      const year = date.getFullYear();
      const key = `${customerId}-${year}-${monthNumber}`;
      const firstDayOfMonth = new Date(year, monthNumber, 1);

      if (!customerMonthlyRewards[key]) {
        customerMonthlyRewards[key] = {
          customerId,
          customerName,
          monthlyRewardPoints: 0,
          monthDate: firstDayOfMonth,
          monthNumber,
          year,
        };
      }

      customerMonthlyRewards[key].monthlyRewardPoints += rewardPoints || 0;
      return customerMonthlyRewards;
    },
    {},
  );

  return Object.values(map).sort(
    (a, b) => a.year - b.year || a.monthNumber - b.monthNumber,
  );
};

/**
 * Aggregate total rewards per customer across all transactions.
 * Sums up all reward points for each unique customer.
 *
 * @param {Array<Object>} transactions - Array of enriched transaction objects (with rewardPoints)
 * @returns {Array<Object>} Array of customer total reward aggregations
 */
export const getTotalRewards = (transactions) => {
  /**
   * Map to store aggregated total rewards per customer
   * Key: customerId
   * @type {Object<string, Object>}
   */
  if (!Array.isArray(transactions)) return [];
  const map = transactions.reduce(
    (aggregatedRewards, { customerId, customerName, rewardPoints }) => {
      if (!aggregatedRewards[customerId]) {
        aggregatedRewards[customerId] = {
          customerId,
          customerName,
          totalRewardPoints: 0,
        };
      }

      aggregatedRewards[customerId].totalRewardPoints += rewardPoints || 0;
      return aggregatedRewards;
    },
    {},
  );

  return Object.values(map);
};

/**
 * Sort transactions by purchase date in ascending order.
 * Creates a new sorted array without modifying the original.
 *
 * @param {Array<Object>} transactions - Array of transaction objects
 * @returns {Array<Object>} New array sorted by purchaseDate (oldest first)

 */
export const sortByDate = (transactions) => {
  if (!Array.isArray(transactions)) return [];

  return [...transactions].sort(
    (a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate),
  );
};
