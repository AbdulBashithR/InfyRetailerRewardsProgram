import { render, screen } from "@testing-library/react";

import { useFetch } from "../../hooks/useFetch";
import { DashboardView } from "../../pages/DashboardView";
import {
  computeRewardsPointsForTransactions,
  getMonthlyRewards,
  getTotalRewards,
  sortByDate,
} from "../../utils/rewardUtils";

// Mock useFetch hook
jest.mock("../../hooks/useFetch", () => ({
  useFetch: jest.fn(),
}));

// Mock RewardsTable to avoid heavy MUI/DataGrid rendering
jest.mock("../../components/ui/GridRewardsTable", () => ({
  __esModule: true,
  default: ({ title, data }) => (
    <div data-testid={`table-${title}`}>
      <span>{title}</span>
      <span data-testid={`rows-${title}`}>{data?.length}</span>
    </div>
  ),
}));

// Mock reward utils to control computation output
jest.mock("../../utils/rewardUtils", () => ({
  computeRewardsPointsForTransactions: jest.fn(),
  getMonthlyRewards: jest.fn(),
  getTotalRewards: jest.fn(),
  sortByDate: jest.fn(),
}));

describe("Dashboard Page", () => {
  const mockTransactions = [
    {
      transactionId: "T001",
      customerId: "C001",
      price: 120,
      purchaseDate: "2025-12-05",
    },
  ];

  const mockMonthly = [{ month: "Dec", points: 90 }];
  const mockTotal = [{ customerId: "C001", totalPoints: 90 }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading spinner when loading is true", () => {
    useFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<DashboardView />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("shows error alert when error exists", () => {
    useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: "Failed to fetch data",
    });

    render(<DashboardView />);

    expect(
      screen.getByText("An error occurred while loading dashboard data."),
    ).toBeInTheDocument();
  });

  test("renders all three reward tables when data is loaded", async () => {
    useFetch.mockReturnValue({
      data: mockTransactions,
      loading: false,
      error: null,
    });

    computeRewardsPointsForTransactions.mockReturnValue(mockTransactions);
    getMonthlyRewards.mockReturnValue(mockMonthly);
    getTotalRewards.mockReturnValue(mockTotal);
    sortByDate.mockReturnValue(mockTransactions);

    render(<DashboardView />);

    expect(await screen.findByText("Monthly Rewards")).toBeInTheDocument();
    expect(await screen.findByText("Total Rewards")).toBeInTheDocument();
    expect(await screen.findByText("Transactions")).toBeInTheDocument();
  });
});
