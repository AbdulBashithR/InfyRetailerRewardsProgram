import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "../../components/Layout";

jest.mock("../../components/common/Drawer", () => ({
  CommonDrawer: ({ open, onClose }) =>
    open ? (
      <div data-testid="drawer">
        <button onClick={onClose}>Close Drawer</button>
      </div>
    ) : null,
}));

jest.mock("../../components/common/ErrorBoundary", () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>,
}));

describe("Layout Component", () => {
  const renderLayout = () =>
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );

  test("renders app bar title and avatar", () => {
    renderLayout();

    expect(screen.getByText("Retailer Rewards Program")).toBeInTheDocument();

    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  test("opens drawer when menu button is clicked", () => {
    renderLayout();

    const menuButton = screen.getByLabelText("menu");
    fireEvent.click(menuButton);

    expect(screen.getByTestId("drawer")).toBeInTheDocument();
  });

  test("closes drawer when onClose is triggered", () => {
    renderLayout();

    const menuButton = screen.getByLabelText("menu");
    fireEvent.click(menuButton);

    const closeButton = screen.getByText("Close Drawer");
    fireEvent.click(closeButton);

    expect(screen.queryByTestId("drawer")).not.toBeInTheDocument();
  });

  test("renders outlet container safely", () => {
    renderLayout();

    expect(screen.getByText("Retailer Rewards Program")).toBeInTheDocument();
  });
});
