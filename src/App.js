/**
 * @fileoverview Main App component that sets up routing for the application.
 * Contains routes for the dashboard and tabbed views.
 */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Alert } from "@mui/material";

import ErrorBoundary from "./components/common/ErrorBoundary";
import Layout from "./components/Layout";
import { DashboardView } from "./pages/DashboardView";
import NotFound from "./pages/NotFound";

/**
 * App component - Main application entry point with routing setup.
 *
 * @component
 * @returns {React.ReactElement} The root application component with routes
 *
 * @description
 * Sets up the React Router with the following routes:
 * - "/" - Dashboard view (Index component)
 * - "/tabs" - Tabbed rewards view (TabsView component)
 * Both routes are wrapped in the Layout component for consistent UI
 */
function App() {
  return (
    <ErrorBoundary
      fallback={<Alert severity="error">Something went wrong.</Alert>}
    >
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardView />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
