import { render, screen } from "@testing-library/react";

import GridTable from "../../../components/common/GridTable";

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("GridTable Component", () => {
  const transactionData = [
    {
      transactionId: "T001",
      customerName: "Alice Johnson",
      productPurchased: "Headphones",
      price: 120,
    },
    {
      transactionId: "T002",
      customerName: "Alice Johnson",
      productPurchased: "Book",
      price: 30,
    },
  ];

  const columns = [
    { field: "transactionId", headerName: "Transaction ID" },
    { field: "customerName", headerName: "Customer Name" },
    { field: "productPurchased", headerName: "Product" },
    {
      field: "price",
      headerName: "Price",
      align: "right",
      render: (value) => <span data-testid="price">₹{value}</span>,
    },
  ];

  test("renders title when provided", () => {
    render(
      <GridTable
        title="Transactions Grid"
        data={transactionData}
        columns={columns}
      />,
    );

    expect(screen.getByText("Transactions Grid")).toBeInTheDocument();
  });

  test("renders column headers correctly", async () => {
    render(<GridTable data={transactionData} columns={columns} />);

    expect(await screen.findByText("Transaction ID")).toBeInTheDocument();
    expect(await screen.findByText("Customer Name")).toBeInTheDocument();
    expect(await screen.findByText("Product")).toBeInTheDocument();
    expect(await screen.findByText("Price")).toBeInTheDocument();
  });

  test("renders rows from transaction data", async () => {
    render(<GridTable data={transactionData} columns={columns} />);

    expect(await screen.findByText("T001")).toBeInTheDocument();
    expect(await screen.findByText("Headphones")).toBeInTheDocument();
    expect(await screen.findByText("Book")).toBeInTheDocument();
  });

  test("uses transactionId as fallback id for rows", async () => {
    render(<GridTable data={transactionData} columns={columns} />);
    expect(await screen.findByText("T002")).toBeInTheDocument();
  });

  test("renders custom renderCell content", async () => {
    render(<GridTable data={transactionData} columns={columns} />);

    const priceCells = await screen.findAllByTestId("price");
    expect(priceCells).toHaveLength(2);
    expect(priceCells[0]).toHaveTextContent("₹120");
    expect(priceCells[1]).toHaveTextContent("₹30");
  });

  test("handles empty data gracefully", async () => {
    render(<GridTable data={[]} columns={columns} />);
    expect(await screen.findByText("Transaction ID")).toBeInTheDocument();
  });

  test("does not crash when re-rendered with same props (memo stability)", () => {
    const { rerender } = render(
      <GridTable data={transactionData} columns={columns} />,
    );

    rerender(<GridTable data={transactionData} columns={columns} />);

    expect(screen.getByText("Transaction ID")).toBeInTheDocument();
  });
});
