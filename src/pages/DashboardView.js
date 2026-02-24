/**
 * @fileoverview Dashboard page displaying rewards data in a grid layout.
 */

//PACKAGE IMPORTS
import { useMemo, lazy, Suspense, useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { Alert, Container, Grid, Box } from "@mui/material";

//COMPONENTS IMPORTS
import ErrorBoundary from "../components/common/ErrorBoundary";
import { Loader } from "../components/common/Loader";

//CONSTANTS IMPORTS
import {
  monthlyRewardsColumns,
  totalRewardsColumns,
  transactionsColumns,
} from "../constants/tableColumns";

//HOOKS IMPORTS
import { useFetch } from "../hooks/useFetch";

//STYLES IMPORTS
import {
  DashboardPageBoxStyles as boxStyles,
  DashboardGridHeight,
  DashboardGridItemHeight,
  DashboardGridSubItemHeight,
  marginTop4,
} from "../styles";

//UTILS IMPORTS
import { filterByDateRange } from "../utils/filterUtils";
import {
  computeRewardsPointsForTransactions,
  getMonthlyRewards,
  getTotalRewards,
  sortByDate,
} from "../utils/rewardUtils";

const GridRewardsTable = lazy(
  () => import("../components/ui/GridRewardsTable"),
);

/**
 * Index (Dashboard) component - Main dashboard view with rewards overview.
 *
 * @component
 * @returns {React.ReactElement} Dashboard grid with three rewards tables
 *

 */
export const DashboardView = () => {
  const { data, loading, error } = useFetch("/mockData.json");

  //Global state for date filtering
  const filterDate = useOutletContext();
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (!filterDate || (!filterDate.startDate && !filterDate.endDate)) {
      setFilteredData(data);
      return;
    }

    const filtered = filterByDateRange(
      data,
      filterDate?.startDate,
      filterDate?.endDate,
      "purchaseDate",
    );
    setFilteredData(filtered);
  }, [data, filterDate]);

  /**
   * Memoized computed transactions with reward points
   * Recalculates only when data changes
   */
  const transactions = useMemo(
    () => computeRewardsPointsForTransactions(filteredData ?? []),
    [filteredData],
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
    return <Loader />;
  }

  /**
   * Display error message if fetch failed
   */
  if (error) {
    return (
      <Container sx={marginTop4}>
        <Alert severity="error">
          {error?.message ?? "An error occurred while loading dashboard data."}
        </Alert>
      </Container>
    );
  }

  return (
    <ErrorBoundary
      fallback={<Alert severity="error">Failed to Dashboard Component</Alert>}
    >
      <Grid container sx={DashboardGridHeight}>
        {/* Top row: Monthly Rewards (left) and Total Rewards (right) */}
        <Grid container sx={DashboardGridItemHeight} size={12}>
          {/* Left column: Monthly Rewards Table */}
          <Grid sx={DashboardGridSubItemHeight} size={6}>
            <Box sx={boxStyles}>
              <Suspense fallback={<Loader />}>
                <GridRewardsTable
                  data={monthlyRewards}
                  title="Monthly Rewards"
                  columns={monthlyRewardsColumns}
                  errorFallBack="Failed to load User monthly rewards"
                />
              </Suspense>
            </Box>
          </Grid>

          {/* Right column: Total Rewards Table */}
          <Grid sx={DashboardGridSubItemHeight} size={6}>
            <Box sx={boxStyles}>
              <Suspense fallback={<Loader />}>
                <GridRewardsTable
                  data={totalRewards}
                  title="Total Rewards"
                  columns={totalRewardsColumns}
                  errorFallBack="Failed to load User total rewards"
                />
              </Suspense>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom row: Transactions Table (full width) */}
        <Grid sx={DashboardGridItemHeight} size={12}>
          <Box sx={boxStyles}>
            <Suspense fallback={<Loader />}>
              <GridRewardsTable
                data={sortedTransactions}
                title="Transactions"
                columns={transactionsColumns}
                errorFallBack="Failed to load transactions"
                isDateSearchable={true}
                searchableDateField="purchaseDate"
              />
            </Suspense>
          </Box>
        </Grid>
      </Grid>
    </ErrorBoundary>
  );
};
