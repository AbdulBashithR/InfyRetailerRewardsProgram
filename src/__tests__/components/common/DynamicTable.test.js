import { render, screen } from "@testing-library/react";
import DynamicTable from "../../../components/common/DynamicTable";

describe("DynamicTable - Transactions Data", () => {
  const transactionData = [
    {
      transactionId: "T001",
      customerId: "C001",
      customerName: "Alice Johnson",
      purchaseDate: "2025-12-05",
      productPurchased: "Headphones",
      price: 120.0,
    },
    {
      transactionId: "T002",
      customerId: "C001",
      customerName: "Alice Johnson",
      purchaseDate: "2025-12-18",
      productPurchased: "Book",
      price: 30.0,
    },
    {
      transactionId: "T003",
      customerId: "C001",
      customerName: "Alice Johnson",
      purchaseDate: "2026-01-10",
      productPurchased: "Jacket",
      price: 75.0,
    },
  ];

  const columns = [
    { field: "transactionId", headerName: "Transaction ID" },
    { field: "customerName", headerName: "Customer Name" },
    { field: "productPurchased", headerName: "Product" },
    { field: "price", headerName: "Price", align: "right" },
  ];

  test("renders transaction table with API data", () => {
    render(
      <DynamicTable
        title="Transactions"
        data={transactionData}
        columns={columns}
      />,
    );

    // Title
    expect(screen.getByText("Transactions")).toBeInTheDocument();

    // Headers
    expect(screen.getByText("Transaction ID")).toBeInTheDocument();
    expect(screen.getByText("Customer Name")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();

    // Row values
    expect(screen.getByText("T001")).toBeInTheDocument();
    expect(screen.getAllByText("Alice Johnson").length).toBe(3);
    expect(screen.getByText("Headphones")).toBeInTheDocument();
    expect(screen.getByText("Book")).toBeInTheDocument();
    expect(screen.getByText("Jacket")).toBeInTheDocument();
  });

  test("renders correct number of rows based on API response", () => {
    render(<DynamicTable data={transactionData} columns={columns} />);

    const rows = screen.getAllByRole("row");
    // 1 header row + 3 data rows = 4
    expect(rows.length).toBe(4);
  });

  test("shows 'No data' when API returns empty array", () => {
    render(<DynamicTable data={[]} columns={columns} />);

    expect(screen.getByText("No data")).toBeInTheDocument();
  });
});
