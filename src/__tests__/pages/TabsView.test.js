import { render, screen, fireEvent } from "@testing-library/react";
import TabsView from "../../pages/TabsView";

// Mock useFetch hook
jest.mock("../../hooks/useFetch", () => ({
  useFetch: jest.fn(),
}));

// Mock heavy GridTable (prevents DataGrid + TextEncoder issues)
jest.mock("../../components/common/GridTable", () => ({
  __esModule: true,
  default: ({ title, data }) => (
    <div data-testid={`grid-${title}`}>
      <span>{title}</span>
      <span data-testid={`rows-${title}`}>{data?.length}</span>
    </div>
  ),
}));

// Mock reward utils (business logic isolation)
jest.mock("../../utils/rewardUtils", () => ({
  ComputeRewardsPointsForTransactions: jest.fn(),
  getMonthlyRewards: jest.fn(),
  getTotalRewards: jest.fn(),
  sortByDate: jest.fn(),
}));

import { useFetch } from "../../hooks/useFetch";
import {
  ComputeRewardsPointsForTransactions,
  getMonthlyRewards,
  getTotalRewards,
  sortByDate,
} from "../../utils/rewardUtils";

describe("TabsView Component", () => {
  const mockApiData = [
    {
      transactionId: "T001",
      customerId: "C001",
      price: 120,
      purchaseDate: "2025-12-05",
    },
  ];

  const computedTransactions = [{ ...mockApiData[0], points: 90 }];

  const monthlyMock = [{ month: "Dec", points: 90 }];
  const totalMock = [{ customerId: "C001", totalPoints: 90 }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading spinner when loading is true", () => {
    useFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<TabsView />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("shows error alert when error exists", () => {
    useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: "Failed to fetch transactions",
    });

    render(<TabsView />);

    expect(
      screen.getByText("Failed to fetch transactions"),
    ).toBeInTheDocument();
  });

  test("renders Monthly Rewards tab by default", () => {
    useFetch.mockReturnValue({
      data: mockApiData,
      loading: false,
      error: null,
    });

    ComputeRewardsPointsForTransactions.mockReturnValue(computedTransactions);
    getMonthlyRewards.mockReturnValue(monthlyMock);
    getTotalRewards.mockReturnValue(totalMock);
    sortByDate.mockReturnValue(computedTransactions);

    render(<TabsView />);

    expect(screen.getByTestId("grid-Monthly Rewards")).toBeInTheDocument();
  });

  test("switches to Total Rewards tab on click", () => {
    useFetch.mockReturnValue({
      data: mockApiData,
      loading: false,
      error: null,
    });

    ComputeRewardsPointsForTransactions.mockReturnValue(computedTransactions);
    getMonthlyRewards.mockReturnValue(monthlyMock);
    getTotalRewards.mockReturnValue(totalMock);
    sortByDate.mockReturnValue(computedTransactions);

    render(<TabsView />);

    fireEvent.click(screen.getByRole("tab", { name: "Total Rewards" }));

    expect(screen.getByTestId("grid-Total Rewards")).toBeInTheDocument();
  });

  test("switches to Transactions tab and shows sorted data", () => {
    useFetch.mockReturnValue({
      data: mockApiData,
      loading: false,
      error: null,
    });

    ComputeRewardsPointsForTransactions.mockReturnValue(computedTransactions);
    getMonthlyRewards.mockReturnValue(monthlyMock);
    getTotalRewards.mockReturnValue(totalMock);
    sortByDate.mockReturnValue(computedTransactions);

    render(<TabsView />);

    fireEvent.click(screen.getByRole("tab", { name: "Transactions" }));

    expect(screen.getByTestId("grid-Transactions")).toBeInTheDocument();
  });

  test("calls reward computation with fetched data", () => {
    useFetch.mockReturnValue({
      data: mockApiData,
      loading: false,
      error: null,
    });

    ComputeRewardsPointsForTransactions.mockReturnValue(computedTransactions);
    getMonthlyRewards.mockReturnValue(monthlyMock);
    getTotalRewards.mockReturnValue(totalMock);
    sortByDate.mockReturnValue(computedTransactions);

    render(<TabsView />);

    expect(ComputeRewardsPointsForTransactions).toHaveBeenCalledWith(
      mockApiData,
    );
  });
});
