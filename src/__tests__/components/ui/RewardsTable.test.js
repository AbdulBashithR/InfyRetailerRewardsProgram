import { render, screen } from "@testing-library/react";

import RewardsTable from "../../../components/ui/RewardsTable";

jest.mock("../../../components/common/DynamicTable", () => ({
  __esModule: true,
  default: ({ title, data, columns }) => (
    <div data-testid="dynamic-table">
      <span data-testid="table-title">{title}</span>
      <span data-testid="table-data">{JSON.stringify(data)}</span>
      <span data-testid="table-columns">{JSON.stringify(columns)}</span>
    </div>
  ),
}));

jest.mock("../../../components/common/ErrorBoundary", () => ({
  __esModule: true,
  default: ({ children, fallback }) => (
    <div data-testid="error-boundary">{children || fallback}</div>
  ),
}));

describe("RewardsTable", () => {
  const mockData = [
    { id: 1, name: "Alice", points: 100 },
    { id: 2, name: "Bob", points: 200 },
  ];

  const mockColumns = [
    { field: "name", headerName: "Name" },
    { field: "points", headerName: "Points" },
  ];

  it("renders DynamicTable with correct props", () => {
    render(
      <RewardsTable title="Rewards" data={mockData} columns={mockColumns} />,
    );

    expect(screen.getByTestId("dynamic-table")).toBeInTheDocument();
    expect(screen.getByTestId("table-title")).toHaveTextContent("Rewards");
    expect(screen.getByTestId("table-data")).toHaveTextContent(
      JSON.stringify(mockData),
    );
    expect(screen.getByTestId("table-columns")).toHaveTextContent(
      JSON.stringify(mockColumns),
    );
  });

  it("renders inside ErrorBoundary", () => {
    render(
      <RewardsTable title="Rewards" data={mockData} columns={mockColumns} />,
    );

    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
  });

  it("uses default error fallback message", () => {
    render(<RewardsTable data={mockData} columns={mockColumns} />);

    expect(screen.getByTestId("dynamic-table")).toBeInTheDocument();
  });

  it("accepts custom error fallback message", () => {
    render(
      <RewardsTable
        data={mockData}
        columns={mockColumns}
        errorFallBack="Custom error message"
      />,
    );

    expect(screen.getByTestId("dynamic-table")).toBeInTheDocument();
  });
});
