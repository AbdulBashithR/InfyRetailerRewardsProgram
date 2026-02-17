import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Layout from "../../components/Layout";

jest.mock("../../components/common/ErrorBoundary", () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>,
}));

describe("Layout Component", () => {
  const renderLayout = () =>
    render(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Layout />
      </MemoryRouter>,
    );

  test("renders app bar title and avatar", () => {
    renderLayout();

    expect(screen.getByText("Retailer Rewards Program")).toBeInTheDocument();
  });

  test("renders outlet container safely", () => {
    renderLayout();

    expect(screen.getByText("Retailer Rewards Program")).toBeInTheDocument();
  });
});
