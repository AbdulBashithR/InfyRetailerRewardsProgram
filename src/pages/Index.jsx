/**
 * @fileoverview Dashboard page displaying rewards data in a grid layout.
 */

//PACKAGE IMPORTS
import { useMemo } from "react";
import { Alert, CircularProgress, Container, Grid, Box } from "@mui/material";

//HOOKS IMPORTS
import { useFetch } from "../hooks/useFetch";

//UTILS IMPORTS
import {
  ComputeRewardsPointsForTransactions,
  getMonthlyRewards,
  getTotalRewards,
  sortByDate,
} from "../utils/rewardUtils";

//CONSTANTS IMPORTS
import {
  monthlyRewardsColumns,
  totalRewardsColumns,
  transactionsColumns,
} from "../constants/tableColumns";

//COMPONENTS IMPORTS
import RewardsTable from "../components/ui/RewardsTable";

/**
 * Index (Dashboard) component - Main dashboard view with rewards overview.
 *
 * @component
 * @returns {React.ReactElement} Dashboard grid with three rewards tables
 *
 * @description
 * Main dashboard page that displays rewards data in a 2x2 grid layout:
 * - Monthly Rewards table (50% height)
 * - Total Rewards table (50% height)
 * - Bottom: Transactions table (50% height, full width)
 *
 * Fetches transaction data and computes various aggregations using useMemo
 * for performance optimization. Includes loading and error states.
 
 */
export const Index = () => {
  /**
   * Fetch transaction data from mock data endpoint
   * @type {Object}
   */
  const { data, loading, error } = useFetch("/mockData.json");

  /**
   * Reusable box styling for table containers
   * @type {Object}
   */
  const boxStyles = {
    /** Full height box with scrollable content */
    height: "100%",
    overflow: "auto",
    p: 2,
    boxSizing: "border-box",
  };

  /**
   * Memoized computed transactions with reward points
   * Recalculates only when data changes
   */
  const transactions = useMemo(
    () => ComputeRewardsPointsForTransactions(data ?? []),
    [data],
  );
  const monthlyRewards = useMemo(
    () => getMonthlyRewards(transactions),
    [transactions],
  );

  const totalRewards = useMemo(
    () => getTotalRewards(transactions),
    [transactions],
  );

  const sortedTransactions = useMemo(
    () => sortByDate(transactions),
    [transactions],
  );

  /**
   * Display loading spinner while fetching data
   */
  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  /**
   * Display error message if fetch failed
   */
  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Grid
      container
      sx={{
        height: "100vh",
      }}
    >
      {/* Top row: Monthly Rewards (left) and Total Rewards (right) */}
      <Grid
        container
        spacing={2}
        sx={{ height: "50vh", minHeight: 0 }}
        size={12}
      >
        {/* Left column: Monthly Rewards Table */}
        <Grid item sx={{ height: "100%", minHeight: 0 }} size={6}>
          <Box sx={boxStyles}>
            <RewardsTable
              data={monthlyRewards}
              title="Monthly Rewards"
              columns={monthlyRewardsColumns}
              errorFallBack="Failed to load User monthly rewards"
            />
          </Box>
        </Grid>

        {/* Right column: Total Rewards Table */}
        <Grid item sx={{ height: "100%", minHeight: 0 }} size={6}>
          <Box sx={boxStyles}>
            <RewardsTable
              data={totalRewards}
              title="Total Rewards"
              columns={totalRewardsColumns}
              errorFallBack="Failed to load User total rewards"
            />
          </Box>
        </Grid>
      </Grid>

      {/* Bottom row: Transactions Table (full width) */}
      <Grid item sx={{ height: "50vh", minHeight: 0 }} size={12}>
        <Box sx={boxStyles}>
          <RewardsTable
            data={sortedTransactions}
            title="Transactions"
            columns={transactionsColumns}
            errorFallBack="Failed to load transactions"
          />
        </Box>
      </Grid>
    </Grid>
  );
};
