import { render, screen } from "@testing-library/react";
import { Index } from "../../pages/Index";

// Mock useFetch hook
jest.mock("../../hooks/useFetch", () => ({
  useFetch: jest.fn(),
}));

// Mock RewardsTable to avoid heavy MUI/DataGrid rendering
jest.mock("../../components/ui/RewardsTable", () => ({
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

import { useFetch } from "../../hooks/useFetch";
import {
  computeRewardsPointsForTransactions,
  getMonthlyRewards,
  getTotalRewards,
  sortByDate,
} from "../../utils/rewardUtils";

describe("Index Page", () => {
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

    render(<Index />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("shows error alert when error exists", () => {
    useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: "Failed to fetch data",
    });

    render(<Index />);

    expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
  });

  test("renders all three reward tables when data is loaded", () => {
    useFetch.mockReturnValue({
      data: mockTransactions,
      loading: false,
      error: null,
    });

    computeRewardsPointsForTransactions.mockReturnValue(mockTransactions);
    getMonthlyRewards.mockReturnValue(mockMonthly);
    getTotalRewards.mockReturnValue(mockTotal);
    sortByDate.mockReturnValue(mockTransactions);

    render(<Index />);

    expect(screen.getByText("Monthly Rewards")).toBeInTheDocument();
    expect(screen.getByText("Total Rewards")).toBeInTheDocument();
    expect(screen.getByText("Transactions")).toBeInTheDocument();
  });

  test("calls reward computation utilities with correct data flow", () => {
    useFetch.mockReturnValue({
      data: mockTransactions,
      loading: false,
      error: null,
    });

    computeRewardsPointsForTransactions.mockReturnValue(mockTransactions);
    getMonthlyRewards.mockReturnValue(mockMonthly);
    getTotalRewards.mockReturnValue(mockTotal);
    sortByDate.mockReturnValue(mockTransactions);

    render(<Index />);

    expect(computeRewardsPointsForTransactions).toHaveBeenCalledWith(
      mockTransactions,
    );
    expect(getMonthlyRewards).toHaveBeenCalledWith(mockTransactions);
    expect(getTotalRewards).toHaveBeenCalledWith(mockTransactions);
    expect(sortByDate).toHaveBeenCalledWith(mockTransactions);
  });

  test("passes correct row counts to each table", () => {
    useFetch.mockReturnValue({
      data: mockTransactions,
      loading: false,
      error: null,
    });

    computeRewardsPointsForTransactions.mockReturnValue(mockTransactions);
    getMonthlyRewards.mockReturnValue(mockMonthly);
    getTotalRewards.mockReturnValue(mockTotal);
    sortByDate.mockReturnValue(mockTransactions);

    render(<Index />);

    expect(screen.getByTestId("rows-Monthly Rewards")).toHaveTextContent("1");
    expect(screen.getByTestId("rows-Total Rewards")).toHaveTextContent("1");
    expect(screen.getByTestId("rows-Transactions")).toHaveTextContent("1");
  });
});
