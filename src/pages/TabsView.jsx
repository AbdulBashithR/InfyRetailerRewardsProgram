/**
 * @fileoverview Tabbed view page displaying rewards data in different tab sections.
 */

import { useState, useMemo } from "react";
import {
  Container,
  CircularProgress,
  Alert,
  Box,
  Tabs,
  Tab,
} from "@mui/material";

import ErrorBoundary from "../components/common/ErrorBoundary";
import GridTable from "../components/common/GridTable";

import {
  monthlyRewardsColumns,
  totalRewardsColumns,
  transactionsColumns,
} from "../constants/tableColumns";

import { useFetch } from "../hooks/useFetch";

import {
  computeRewardsPointsForTransactions,
  getMonthlyRewards,
  getTotalRewards,
  sortByDate,
} from "../utils/rewardUtils";
import GridRewardsTable from "../components/ui/GridRewardsTable";

/**
 * TabsView component - Displays rewards data organized in three tabs.
 *
 * @component
 * @returns {React.ReactElement} Tabbed interface with rewards data
 *
 * @description
 * Page component that fetches transaction data and displays it in three different tabs:
 * 1. Monthly Rewards - Aggregated rewards by customer and month
 * 2. Total Rewards - Cumulative rewards per customer
 * 3. Transactions - Detailed individual transaction records
 *
 * Includes loading state with spinner and error state with alert messages.
 * Uses GridTable component for displaying the data with pagination and sorting.
 *
 
 */
const TabsView = () => {
  const [tab, setTab] = useState(0);
  const { data, loading, error } = useFetch("/mockData.json");

  /**
   * Transform fetched data to include computed reward points
   * @type {Array}
   */
  const transactions = useMemo(
    () => computeRewardsPointsForTransactions(data ?? []),
    [data],
  );

  /**
   * Memoized monthly aggregated rewards
   * Recalculates only when transactions change
   * @type {Array}
   */
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
   * Display loading spinner while fetching
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
        <Alert severity="error">
          {error?.message ?? "An error occurred while loading tabs view data."}
        </Alert>
      </Container>
    );
  }

  return (
    <ErrorBoundary
      fallback={<Alert severity="error">Failed to load Tabs View</Alert>}
    >
      <Container sx={{ py: 4 }}>
        {/* Tab navigation */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label="Monthly Rewards" />
            <Tab label="Total Rewards" />
            <Tab label="Transactions" />
          </Tabs>
        </Box>

        {/* Tab 0: Monthly Rewards Table */}
        {tab === 0 && (
          <GridRewardsTable
            data={monthlyRewards}
            title="Monthly Rewards"
            columns={monthlyRewardsColumns}
            errorFallBack="Failed to load User monthly rewards"
          />
        )}

        {/* Tab 1: Total Rewards Table */}
        {tab === 1 && (
          <GridRewardsTable
            data={totalRewards}
            title="Total Rewards"
            columns={totalRewardsColumns}
            errorFallBack="Failed to load User total rewards"
          />
        )}

        {/* Tab 2: Transactions Table */}
        {tab === 2 && (
          <GridRewardsTable
            data={sortedTransactions}
            title="Transactions"
            columns={transactionsColumns}
            errorFallBack="Failed to load transactions"
          />
        )}
      </Container>
    </ErrorBoundary>
  );
};

export default TabsView;
